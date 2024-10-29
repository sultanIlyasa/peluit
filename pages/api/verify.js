import clientPromise from "@lib/mongodb"
import { getCookie } from "cookies-next"
import njwt from "njwt"

export default async function handler(
  req,
  res
) {
  const DATA = JSON.parse(req.body)
  const client = await clientPromise
  const usersDB =  client.db(process.env.MONGODB_DB).collection("users")
  if(req.method === "POST"){
    let tokenBody = JSON.parse(Buffer.from(getCookie("token", {req,res}).split(".")[1], "base64").toString("ascii").replace('\\',""))
    let userData = await usersDB.find({npm: tokenBody.npm}).toArray()
    userData = userData[0]
    let signingKey = Buffer.from(userData.passSign, "base64")
    njwt.verify(getCookie("token", {req,res}), signingKey, async (err, verifiedJWT) => {
        if(!err){
            await usersDB.updateOne({npm: tokenBody.npm}, {$set: {isVerified : false, urlVerifikasi: DATA.url}})
            res.json({message: "Pemilihan sukses"})
        }else{
            res.json({message: "Tidak Terotorisasi !!"})
        }
    })
  }
}
