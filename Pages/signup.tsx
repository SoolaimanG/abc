"use client";

import AllModals from "@/Components/allModals";
import Background from "@/Components/background";
import Button from "@/Components/button";
import ButtonTwo from "@/Components/buttonTwo";
import Input from "@/Components/input";
import { IconButton } from "@mui/material";
import Link from "next/link";
import React, { useContext, useId, useState } from "react";
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiFillQuestionCircle,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ContextAPI } from "@/Providers/provider";
import { FaPaperPlane } from "react-icons/fa";
import { generateRandomProfileImage } from "@/Functions";

const Signup = () => {
  const imageURL = "https://i.ibb.co/V3ycqqt/1691188417152-1.png";
  const route = useRouter();
  const [open, setOpen] = useState(false); //To pass to allModal Component
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(ContextAPI);
  const [showModal, setShowModal] = useState(false);
  let emailAddress = "";

  //Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  //Sending a post request using axios
  const handleSubmit = async () => {
    setLoading(true);
    dispatch({ type: "loading" });
    emailAddress = emailAddress;
    await axios
      .post("/api/signup", {
        username: username?.toLowerCase(),
        email: email?.toLowerCase(),
        password: password?.toLowerCase(),
      })
      .then((res) => {
        dispatch({ type: "success", payload: res.statusText });
        axios
          .post("/api/send-verification", {
            email: email,
          })
          .then(() => {
            setShowModal(true);
          });
      })
      .catch((err) => {
        dispatch({ type: "error", payload: err.response.statusText });
      })
      .finally(() => setLoading(false));

    //Clearing States
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const handleOpenEmail = () => {
    window.open("mailto:" + emailAddress, "_blank");
  };

  return (
    <div className="w-full h-screen relative overflow-hidden flex-col-reverse md:flex-row flex">
      {/* Form Here */}
      <div className="absolute z-30 mt-4 ml-4 top-0 left-0">
        <Button
          name="Back"
          filled={true}
          onClick={() => {
            route.back();
          }}
          bigger={false}
        />
      </div>
      <div className="w-full pt-20 md:pt-14 items-center justify-center flex-col gap-3 basis-[80%] overflow-auto md:basis-[40%] flex">
        <div className="md:w-3/4 w-full pb-5 md:pb-0 px-3 md:px-0 flex-col m-auto gap-3 flex items-center justify-center">
          <h2 className="text-4xl w-full items-start justify-start">
            Welcome to <span className="text-blue-600">Konnect</span>
          </h2>
          <div className="w-full flex items-center justify-between">
            <p className="text-lg">Register</p>
            {/* A Modal Component to avoid using alot of modals */}
            <AllModals
              button={
                <button
                  onClick={() => setOpen(true)}
                  className="flex gap-1 text-blue-600 items-center"
                >
                  Help
                  <AiFillQuestionCircle />
                </button>
              }
              open={open}
              setOpen={setOpen}
            >
              <div className="w-full flex flex-col gap-2">
                <h1 className="text-3xl font-semibold text-center">
                  Strong Password Tips
                </h1>
                <ul>
                  <li>
                    <h2 className="text-xl font-semibold">Minimum Length:</h2>{" "}
                    Your password should be at least 8 characters long.
                  </li>
                  <li>
                    <h2 className="text-xl font-semibold">Mix It Up:</h2>{" "}
                    Include a mix of uppercase letters, lowercase letters,
                    numbers, and special characters (e.g., @, #, $, %) to
                    enhance security.
                  </li>
                  <li>
                    <h2 className="text-xl font-semibold">
                      Avoid Common Choices:
                    </h2>{" "}
                    Refrain from using easily guessable information, such as
                    your name, birthdate, or common phrases.
                  </li>
                  <li>
                    <h2 className="text-xl font-semibold">Be Unique:</h2> Use
                    different passwords for each of your online accounts to
                    prevent potential security risks.
                  </li>
                </ul>

                <h1 className="text-3xl font-semibold text-center">
                  Creating a Memorable Password
                </h1>
                <ul>
                  <li>
                    <h2 className="text-xl font-semibold">Use Passphrases:</h2>{" "}
                    Consider using a passphrase—a sequence of words or a
                    sentence that you can easily remember but is difficult for
                    others to guess. For example, PurpleStar$7Glitter!
                  </li>
                  <li>
                    <h2 className="text-xl font-semibold">
                      Acronyms and Personalization:
                    </h2>{" "}
                    Create a password by combining the first letters of a
                    memorable phrase and personalizing it. For instance,
                    ILoveToTravel$2023! (I Love To Travel in 2023!)
                  </li>
                  <li>
                    <h2 className="text-xl font-semibold">
                      Song Lyrics or Quotes:
                    </h2>{" "}
                    Use a line from your favorite song or a quote from a book
                    that holds significance to you, and add numbers and special
                    characters for complexity. For example, ToBeOrNotToBe?42!
                  </li>
                </ul>

                <p className="text-lg text-gray-500">
                  Remember, your password is your first line of defense against
                  unauthorized access to your account. Choose a strong and
                  memorable password to protect your information and enjoy a
                  secure experience on our platform.
                </p>
              </div>
            </AllModals>
          </div>
          <form className="w-full flex-col flex gap-4" action="">
            <label htmlFor="">
              Email
              <Input
                value={email}
                setValue={setEmail}
                placeholder="johndoe@gmail.com"
                includeBorder={true}
                disabled={false}
                type="email"
              />
            </label>
            <label htmlFor="">
              Username
              <Input
                value={username}
                setValue={setUsername}
                placeholder="John123"
                includeBorder={true}
                disabled={false}
                type="text"
              />
            </label>
            <label htmlFor="">
              Password
              <div className="border-solid w-full rounded-md flex items-center border-[1.3px] border-blue-400 h-[2.5rem]">
                <input
                  placeholder="ILoveToTravel$2023!"
                  disabled={false}
                  value={password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  className={`w-full text-[#252525] pl-1 outline-none`}
                  type={showPassword ? "text" : "password"}
                  name=""
                  id=""
                />
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </IconButton>
              </div>
            </label>
            <div className="w-full">
              <ButtonTwo
                onClick={() => handleSubmit()}
                disabled={loading}
                text="SignUp"
                hover={true}
                rounded={true}
                filled={true}
              />
            </div>
          </form>
          <p>Or</p>
          <ButtonTwo
            onClick={() => {}}
            disabled={true}
            text="SignUp with Google"
            hover={false}
            rounded={true}
            filled={false}
            icon={<FcGoogle />}
          />
          <p className="w-full flex items-start justify-start">
            I have an account?
            <Link
              href={"/auth/login"}
              className="text-[1rem] text-blue-600 underline"
              passHref
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Modal to show when account creation is successful */}
      <AllModals button={<></>} open={showModal} setOpen={setShowModal}>
        <div className="mt-4 h-full w-full flex-col gap-8 flex items-center justify-center">
          <div className="text-blue-600 text-7xl">
            <FaPaperPlane />
          </div>
          <p className="text-4xl font-semibold">Email Sent ✔</p>
          <h3 className="text-2xl text-center">
            A confirmation email has been sent to the email you provided.
          </h3>
          <span className="text-gray-500 text-center text-xl">
            Please verify your account to gain access to all the app features
          </span>
          <div className="flex items-end justify-end flex-col h-full w-full">
            <ButtonTwo
              text="Open email"
              rounded={true}
              hover={false}
              disabled={false}
              filled={true}
              onClick={() => {
                handleOpenEmail();
              }}
            />
          </div>
        </div>
      </AllModals>
      {/* BackGround Here */}
      <div className="w-full basis-[20%] md:basis-[60%] flex">
        <Background
          image={imageURL}
          header="Shorten your link,all your links in one link"
          message="Welcome to Konnect"
        />
      </div>
    </div>
  );
};

export default Signup;
