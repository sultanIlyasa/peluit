import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
export default function PemilihanScreen(){
    const [pilihan, setPilihan] = useState("")
    const Router = useRouter()
    const {
        register,
        handleSubmit,
      } = useForm({
        mode: "onTouched",
      });
      const handlePemilihan = (data) => {
        if(pilihan === "") alert("Mohon memilih cakahim")
        fetch("/api/pemilihan", {
            method: "POST",
            body: JSON.stringify({pilihan: pilihan})
        })
            .then(res => {
                if(res.ok){
                    alert("Pemilihan Berhasil")
                    Router.reload()
                }else{
                    alert("Pemilihan gagal, mohon hubungi panitia")
                }
            })
      }
    return(
        <div className="py-5">     
            <h3 className="mb-5 text-4xl mt-20 font-medium text-gray-900 text-center">Pilih Calon Ketua BE Himatif FMIPA Unpad</h3>
            <form onSubmit={handleSubmit(handlePemilihan)}>
                <ul className="grid gap-6 m-auto w-3/4 md:grid-cols-2">
                    <li>
                        <input {...register("calon", {required: true})} type="radio" id="amir" name="hosting" value="1" className="hidden peer" required />
                        <label onClick={() => setPilihan("1")} htmlFor="amir" className="flex flex-col justify-between items-center p-5 w-full text-gray-500 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                            <img width={200} src="/bombom.png" alt="" />
                            <h4 className="text-2xl font-bold">
                                Calon 1
                            </h4>
                            <p>Muhammad Nefrit Mahardika</p>
                        </label>
                    </li>
                    <li>
                        <input onClick={() => setPilihan("2")} {...register("calon", {required: true})} type="radio" id="radit" name="hosting" value="2" className="hidden peer" />
                        <label htmlFor="radit" className="flex flex-col justify-between items-center p-5 w-full text-gray-500 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <img width={190} src="/kotak-kosong.png" alt="" />
                            <h4 className="text-2xl font-bold">
                                Calon 2
                            </h4>
                            <p>Kotak Kosong</p>
                        </label>
                    </li>
                </ul>
                <div className="w-full flex mt-10">
                    <button className="m-auto py-2 px-5 bg-lime-600 rounded-md font-bold" type="submit" value="submit">Pilih</button>
                </div>
            </form>
        </div>
    )
}