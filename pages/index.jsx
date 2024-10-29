import Navbar from "@components/Navbar"
import 'bootstrap/dist/css/bootstrap.css'
import Footer from "@components/Footer"
import Teaser from "components/Teaser"
import About from "components/About"
import Sekilas from "components/Sekilas"
import Script from "next/script"
import { hasCookie } from "cookies-next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"

export default function Home() {
  const Router = useRouter()
  useEffect(() => {
    if(hasCookie("token")) Router.push("/pemilihan")
  }, [])
  return (
    <>
      <Navbar isHome />
      <Head>
        <meta property="og:image" content="https://peluit.my.id/0hd.png" />
      </Head>
      <Teaser />
      <About />
      <Sekilas />
      <Footer />
      <Script src="https://kit.fontawesome.com/b249d00227.js" crossorigin="anonymous"></Script>
    </>
  )
}
