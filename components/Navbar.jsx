import { hasCookie, deleteCookie } from "cookies-next"
import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.css'
import { useState, useEffect } from "react"
export default function Navbar({
    isHome = false,
}){
    const Router = useRouter()
    const [btnText, setBtnText] = useState("Login")
    useEffect(() => {
        if(hasCookie("token")) setBtnText("Logout")
    }, [])
    let handleButton = () => {
        if(hasCookie("token")){
            deleteCookie("token")
            Router.reload()
        }else{
            Router.push("/login")
        }
    }
    return (
        <nav className={`navbar navbar-bg shadow ${isHome ? "navbar-expand-lg fixed-top" : "navbar-expand-xl navbar-bg"}`}>
            <div className="container-fluid">
            <div className="d-flex w-50 justify-content-between">
                <a className="navbar-brand" href="/">
                <img src="./LOGO.png" alt="" width="30" height="30" className="d-inline-block align-text-top"/>   PELUIT 2023</a>
            </div>

            <div className="navbar-collapse w-100 justify-content-center">
                <div className="btn-pilih d-flex w-100 justify-content-end">
                    <a className="btn btn-outline-primary cursor-pointer" type="button" onClick={() => handleButton()}>{btnText}</a>
                </div>
            </div>
        </div>
    </nav>
    )
}