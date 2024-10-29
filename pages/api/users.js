import clientPromise from "@lib/mongodb"
import bcrypt from "bcrypt"
import secureRandom from "secure-random"
import njwt from "njwt"
import {setCookie} from "cookies-next"
import { mailgun } from '@lib/mailer'

function protect_email (email) {
  let hide = email.split("@")[0].length - 2;//<-- number of characters to hide
  let r = new RegExp(".{"+hide+"}@", "g")
  return email.replace(r, "***@" );
};

export default async function handler(
  req,
  res
) {
  const DATA = JSON.parse(req.body)
  const client = await clientPromise
  const usersDB =  client.db(process.env.MONGODB_DB).collection("users")

  if(req.method === "GET"){
    let tokenBody = JSON.parse(Buffer.from(getCookie("token", {req,res}).split(".")[1], "base64").toString("ascii").replace('\\',""))
    let userData = await usersDB.find({npm: tokenBody.npm}).toArray()
    userData = userData[0]
    let signingKey = Buffer.from(userData.passSign, "base64")
    njwt.verify(getCookie("token", {req,res}), signingKey, async (err, verifiedJWT) => {
        if(!err){
            res.json({message: "Data didapatkan !!", data: userData})
        }else{
            res.status(400).json({message: "Tidak Terotorisasi !!"})
        }
    })
  }

  if(req.method === "POST"){
    let userData = await usersDB.find({npm: DATA.npm}).toArray()
    userData = userData[0]
    if(!userData) return res.status(401).json({message: "NPM Tidak ditemukan !!"})
    if(userData.password === undefined || userData.password === ""){
      if(userData.email === "" || userData.email === undefined) return res.status(401).json({message: "Hubungi panitia untuk menambahkan email ke akun !!"})
      let signingKey = secureRandom(256, {type: 'Buffer'})
      let claims = {
        nama: userData.nama,
        npm: userData.npm
      }
      let token = njwt.create(claims, signingKey)
      token.setExpiration(new Date().getTime() + (60*60*1000))
      await usersDB.updateOne({npm: DATA.npm}, {$set: {mailSign: signingKey.toString("base64")}})
      console.log(userData)
      const data = {
        from: "PELUIT HIMATIF <no-reply@peluit.site>",
        to: userData.email,
        subject: "Ubah Password Peluit",
        template: "ubah-password",
        'h:X-Mailgun-Variables': JSON.stringify({
          url: `https://peluit.site/password?token=${token.compact()}`
        })
      }
      let send = await mailgun().messages.create(process.env.DOMAIN, data);
      console.log(send)
      return res.status(401).json({message: `Email perubahan password telah dikirim ke ${protect_email(userData.email)} !!`})
    }

    if(bcrypt.compareSync(DATA.password, userData.password)){
      let signingKey = secureRandom(256, {type: 'Buffer'})
      let claims = {
        nama: userData.nama,
        npm: userData.npm
      }
      let token = njwt.create(claims, signingKey)
      token.setExpiration(new Date().getTime() + (24*60*60*1000))
      usersDB.updateOne({npm: DATA.npm}, {$set: {passSign: signingKey.toString("base64")}})
      setCookie("token", token.compact(), {req,res, maxAge: 60*60*24})
      return res.json({message: "Sukses Login !!"})
    }
    return res.status(400).json({message: "Password salah !!"})
  }

  if(req.method === "PUT"){
    const saltRounds = 10
    let tokenBody = JSON.parse(Buffer.from(DATA.token.split(".")[1], "base64").toString("ascii").replace('\\',""))
    let userData = await usersDB.find({npm: tokenBody.npm}).toArray()
    userData = userData[0]
    let signingKey = Buffer.from(userData.mailSign, "base64")
    njwt.verify(DATA.token, signingKey, (err, verifiedJWT) => {
      if(!err){
        bcrypt.hash(DATA.password, saltRounds, async (err, hash) => {
          try {
            let hasil = await usersDB.updateOne({npm: tokenBody.npm}, {$set: {password: hash}}) 
            if(hasil) res.status(200).json({message: "Ubah password berhasil !!"})
          } catch (error) {
            console.log(error)
          }
        });
      }else{
        res.status(400).json({message: "Link tidak valid !!"})
      }
    })
  }
}
