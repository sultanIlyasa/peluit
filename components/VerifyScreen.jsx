import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useRouter } from "next/router";
export default function VerifyScreen(){
    const Router = useRouter()
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    const handleVerify = async () => {
        let body = new FormData()
        body.set('key', '088fd1f5a93dcb5a2e340738db1df022')
        body.append('image', imgSrc.split(",")[1])
        body.append('name', "foto verifikasi " + new Date().toDateString())

        let uploadImage = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: body
        })
            .then(res => res.json())
            .then(async res => {
                await fetch("/api/verify", {
                    method: "POST",
                    body: JSON.stringify({
                        url: res.data.url
                    })
                })
                    .then(async res => {
                        if(res.ok){
                            alert("Proses verifikasi sedang dilakukan, mohon menunggu verifikasi dari panitia")
                        }else{
                            const message = await res.json()
                            alert(message.message)
                        }
                    })
            })
        Router.reload()
    } 
    return(
        <div className="py-5">
            <h1 className="text-center text-xl font-bold mt-10">Verifikasi User</h1>
            <p className="text-center mt-4">Silahkan foto wajah bersama kartu KTM/PAUS</p>
            <div className="m-auto flex flex-col md:flex-row">
                <div className="mr-5">
                    <h2 className="text-center">Webcam</h2>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        width="500px"
                        className="mt-2 rounded-lg"
                        screenshotFormat="image/jpg"
                    />
                </div>
                {imgSrc && (
                    <div>
                        <h2 className="text-center">Hasil Foto</h2>
                        <img className="rounded-lg" src={imgSrc} />
                    </div>
                )}
            </div>
            <div className="w-100 flex flex-col mt-4">
                <button className="p-2 bg-blue-600 rounded-md font-medium" onClick={capture}>Capture photo</button>
                {imgSrc && <button className="p-2 bg-[#32cd32] rounded-md font-medium mt-1" onClick={handleVerify}>Kirim</button>}
            </div>
        </div>
    )
}