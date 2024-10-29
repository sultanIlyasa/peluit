import Styles from "@styles/auth/AuthPage.module.css";
import { useState, useEffect } from "react";
import { hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { resetSchema } from "@components/constant/AuthConstant";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthForm from "@components/auth/AuthForm";
import InputBox from "@components/layout/InputBox";
import { setTimeout } from "timers";
import Script from "next/script";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const ResetPassword = () => {
  const [modalStatus, setModalStatus] = useState({ show: false, error: false });
  const Router = useRouter()
  const {token} = Router.query
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(resetSchema),
  });

  useEffect(() => {
    if(hasCookie("token")){
        Router.push("/pemilihan")
    }
  }, [])

  const resetPass = async (data) => {
    const fetchReset = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({
        token: token,
        password: data.password
      })
    })
      .then(async res => {
        if(res.ok){
          alert("Sukses Ubah Password, Redirect Login")
          setTimeout(() => Router.push("/login"), 2000)
        }else{
          const message = await res.json()
          alert(message.message)
        }
      })
  };
  return (
    <>
      <Navbar />
        <AuthForm
          wSubmit={handleSubmit(resetPass)}
          fHeader="Reset Password"
          fDesc=""
          bLabel="Reset Password"
        >
          <InputBox
            name="password"
            label="New Password"
            register={register}
            placeHolder="Enter your password here"
            type="password"
            error={errors}
          />
        </AuthForm>
        <Script src="https://kit.fontawesome.com/b249d00227.js" crossorigin="anonymous"></Script>
        <Footer />
    </>
  );
};

export default ResetPassword;