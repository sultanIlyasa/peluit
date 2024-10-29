import Styles from "@styles/auth/AuthPage.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@components/constant/AuthConstant";
import AuthForm from "@components/auth/AuthForm";
import AuthModal from "@components/auth/AuthModal";
import InputBox from "@components/layout/InputBox";
import { useEffect } from "react";
import { hasCookie } from "cookies-next";
import Router from "next/router";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.css'

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if(hasCookie("token")){
        Router.push("/pemilihan")
    }
  }, [])

  const loginSubmit = async (data) => {
    const fetchLogin = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            npm: data.npm.toString(),
            password: data.password
        })
    })
        .then(async res => {
            if(res.ok){
                return Router.push("/pemilihan")
            }else{
                let message = await res.json()
                alert(message.message)
            }
        })
  };

  return (
    <>
      <Navbar />
        <AuthForm
          wSubmit={handleSubmit(loginSubmit)}
          fHeader="Selamat Datang"
          bLabel="Login"
        >
          <InputBox
            name="npm"
            label="NPM"
            register={register}
            placeHolder="Enter your npm here"
            type="text"
            error={errors}
          />
          <InputBox
            name="password"
            label="Password"
            register={register}
            placeHolder="Enter your password here"
            type="password"
            forgetpass
            error={errors}
          />
        </AuthForm>
        <Script src="https://kit.fontawesome.com/b249d00227.js" crossorigin="anonymous"></Script>
      <Footer />
    </>
  );
};

export default LoginPage;