import VerifyScreen from "@components/VerifyScreen"
import clientPromise from "@lib/mongodb"
import { getCookie } from "cookies-next"
import WaitScreen from "@components/WaitScreen"
import PemilihanScreen from "@components/PemilihanScreen"
import { hasCookie } from "cookies-next"
import Navbar from "@components/Navbar"
import Footer from "@components/Footer"
import Script from "next/script"
export default function PemilihanPage({users}){
    return(
        <>
            <Navbar />
            {!users.isVerified && users.urlVerifikasi && !users.isMilih && <WaitScreen />}
            {!users.isVerified && !users.urlVerifikasi && !users.isMilih && <VerifyScreen />}
            {users.isVerified && users.urlVerifikasi && !users.isMilih && <PemilihanScreen />}
            {users.isVerified && users.urlVerifikasi && users.isMilih && <h1 className="mt-20 text-4xl font-bold text-center">Terimakasih Sudah Memilih !!</h1>}
            <br/>
            <Script src="https://kit.fontawesome.com/b249d00227.js" crossorigin="anonymous"></Script>
            <Footer />
        </>
    )
}

export async function getServerSideProps({req,res}) {
    if(!hasCookie("token", {req,res})) {
      return{
        redirect: {
          destination: "/login",
          permanent: false
        }
      }
    }
    const client = await clientPromise
    const usersDB =  client.db(process.env.MONGODB_DB).collection("users")
    let tokenBody = JSON.parse(Buffer.from(getCookie("token", {req,res}).split(".")[1], "base64").toString("ascii").replace('\\',""))
    let userData = await usersDB.find({npm: tokenBody.npm}).toArray()
    userData = userData[0]
    userData._id = userData._id.toString()
    return {
      props: {
        users: userData
      }, // will be passed to the page component as props
    }
  }
