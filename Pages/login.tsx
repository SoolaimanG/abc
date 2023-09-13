"use client";

import Background from "@/Components/background";
import Button from "@/Components/button";
import ButtonTwo from "@/Components/buttonTwo";
import Input from "@/Components/input";
import { IconButton } from "@mui/material";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiFillLock } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { ContextAPI } from "@/Providers/provider";
//import { findUserByUsername } from "@/Models";
import { User } from "@/Types/types";
//import { findUserByUsername } from "@/Actions/index.action";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oAuthLoading, setOAuthLoading] = useState(false);
  const loginImage = "https://i.ibb.co/41ZzNLG/1691178231552-1.png";
  const { dispatch } = useContext(ContextAPI);
  const route = useRouter();

  const handleLoginWithGoogle = async () => {
    setOAuthLoading(true);
    signIn("google", { callbackUrl: "/app/home" });
  };

  //Handle Signin here
  const handleSignIn = async () => {
    dispatch({ type: "loading" }); //Show the loading indicator
    setLoading(true);

    //!Check to block the request if fields are empty
    if (!username) {
      dispatch({ type: "warning", payload: "Username cannot be empty" });
      setLoading(false);
      return;
    }

    if (!password) {
      dispatch({ type: "warning", payload: "Password cannot be empty" });
      setLoading(false);
      return;
    }

    //SignIn Func for next auth
    signIn("credentials", {
      password: password?.toLowerCase(),
      username: username?.toLowerCase(),
      callbackUrl: "/app/home",
    })
      .then((res) => {
        //
        if (res?.error === "Incorrect password") {
          dispatch({ type: "error", payload: "Incorrect password" });
        } else if (res?.error === "Incorrect username") {
          dispatch({ type: "error", payload: "Incorrect username" });
        } else if (res?.error) {
          dispatch({ type: "error", payload: "Something went wrong" });
        } else {
          dispatch({ type: "none" });
        }
      })
      .catch(() => {
        dispatch({ type: "error", payload: "Something went wrong" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full md:flex-row relative overflow-hidden flex-col-reverse flex h-screen">
      {/* The Login Forms Here */}
      <div className="basis-[70%] overflow-auto md:basis-[40%] w-full flex">
        <div className="absolute z-30 mt-4 ml-4 top-0 left-0">
          <Button
            name="Back"
            bigger={false}
            onClick={() => {
              route.back();
            }}
            filled={true}
          />
        </div>
        <div className="md:w-3/4 w-full pb-5 md:pb-0 px-3 md:px-0 flex-col m-auto gap-3 flex items-center justify-center">
          <div className="w-full items-start flex-col gap-1 flex justify-start">
            <h2 className="text-4xl font-semibold">Hi, Welcome back</h2>
            <p className="text-lg">Enter your details to access your account</p>
          </div>
          <form className="w-full flex-col flex gap-4" action="">
            <label className="w-full" htmlFor="">
              Username
              <Input
                type={"text"}
                placeholder="John123"
                includeBorder={true}
                disabled={false}
                value={username}
                setValue={setUsername}
              />
            </label>
            <label className="w-full" htmlFor="">
              <div className="w-full flex items-center justify-between">
                Password
                <Link
                  href={"/auth/forgot-password"}
                  passHref
                  className="text-[0.8rem] text-blue-600 underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="border-solid w-full rounded-md flex items-center border-[1.3px] border-blue-400 h-[2.5rem]">
                <input
                  placeholder="ILoveToTravel$2023"
                  disabled={false}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className={`w-full text-[#252525] pl-1 outline-none`}
                  type={showPassword ? "text" : "password"}
                  name=""
                  id=""
                />
                <IconButton
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </IconButton>
              </div>
            </label>
            <div className="w-full mt-3">
              <ButtonTwo
                onClick={() => {
                  handleSignIn();
                }}
                disabled={loading}
                text="Login"
                filled={true}
                hover={true}
                rounded={true}
                icon={<AiFillLock />}
              />
            </div>
          </form>
          <span>Or</span>
          <div className="w-full">
            <ButtonTwo
              onClick={() => {
                handleLoginWithGoogle();
              }}
              disabled={oAuthLoading}
              text="Login with google"
              filled={false}
              hover={false}
              rounded={true}
              icon={<FcGoogle />}
            />
          </div>
          <p className="flex text-left w-full items-start justify-start">
            Not registered yet?{" "}
            <Link
              href={"/auth/signup"}
              className="text-[0.9rem] text-blue-600 underline"
              passHref
            >
              Open account
            </Link>{" "}
          </p>
        </div>
      </div>
      {/* The Login Design Pattern Here */}
      <div className="basis-[30%] md:basis-[60%] flex w-full">
        <Background
          header="Share links,build connections and grow your network"
          image={loginImage}
          message="Unlock the power of sharing links with Konnect."
        />
      </div>
    </div>
  );
};

export default Login;
