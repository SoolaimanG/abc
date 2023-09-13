"use client";

import AllModals from "@/Components/allModals";
import Background from "@/Components/background";
import Button from "@/Components/button";
import ButtonTwo from "@/Components/buttonTwo";
import Input from "@/Components/input";
import { ContextAPI } from "@/Providers/provider";
import { regexForPassword } from "@/utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const ResetPassword = ({ params }: { params: string }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const imageURL = "https://i.ibb.co/YBhPSWL/1691201964000-1.png";
  const { dispatch } = useContext(ContextAPI);
  const route = useRouter();

  //Send a post request to the server to change password
  const handleClick = () => {
    //
    if (!regexForPassword.test(password)) {
      dispatch({ type: "warning", payload: "Password is weak" });
      return;
    }

    if (password !== confirmPassword) {
      dispatch({ type: "warning", payload: "Passwords are not matching" });
      return;
    }

    setLoading(true);
    dispatch({ type: "loading" });

    axios
      .post("/api/change-password", {
        password: password?.toLowerCase(),
        confirmPassword: confirmPassword?.toLowerCase(),
        token: params,
      })
      .then((res) => {
        dispatch({ type: "success", payload: "Password Updated!" });
        setPasswordChanged(true);
      })
      .catch((err) => {
        dispatch({ type: "error", payload: "Unable to update" });

        //Knowing the type of error to show the user
        if (err?.message.endsWith("404")) {
          dispatch({
            type: "error",
            payload: "Password change request was not made",
          });
        } else {
          dispatch({ type: "error", payload: "Unable to update" });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="w-full flex overflow-hidden relative md:flex-row flex-col-reverse h-screen">
      <AllModals
        button={<></>}
        open={passwordChanged}
        setOpen={setPasswordChanged}
      >
        <div className="w-full flex flex-col h-full justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold text-center">
            Hooray! Your Password Has Been Reset 🎉
          </h2>

          <p>
            Great news! Your password has been successfully reset. Youre all set
            to dive back into your account using your shiny new password.
          </p>

          <p>Dont forget to do your happy dance! 💃🕺</p>

          <strong>
            If you ever need a hand or have questions, our support team is just
            a friendly email or message away.
          </strong>

          <Link
            className="w-full py-3 text-lg text-center rounded-lg text-white bg-blue-600"
            href={"/auth/login"}
          >
            Login my account
          </Link>
        </div>
      </AllModals>
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
      <div className="w-full basis-[60%] overflow-auto md:basis-[40%] flex">
        <div className="md:w-3/4 w-full pb-5 md:pb-0 px-3 md:px-0 flex-col m-auto gap-3 flex items-center justify-center">
          <div className="w-full flex-col items-start justify-start flex">
            <h2 className="text-4xl text-blue-600">Reset Password!</h2>
            <p className="text-lg">
              Please create a strong and memorable password
            </p>
          </div>
          <form className="w-full flex flex-col gap-4" action="">
            <label htmlFor="">
              Password
              <Input
                includeBorder={true}
                value={password}
                setValue={setPassword}
                placeholder="IComeInPeace$12"
                type="password"
                disabled={false}
              />
            </label>
            <label htmlFor="">
              Confirm Password
              <Input
                includeBorder={true}
                value={confirmPassword}
                setValue={setConfirmPassword}
                placeholder="IComeInPeace$12"
                type="password"
                disabled={false}
              />
            </label>
            <ButtonTwo
              filled={true}
              disabled={loading}
              rounded={true}
              text="Reset"
              hover={false}
              onClick={() => {
                handleClick();
              }}
            />
          </form>
        </div>
      </div>
      <div className="w-full basis-[40%] md:basis-[60%] flex">
        <Background
          image={imageURL}
          header="Create your new strong password"
          message="Reset Your Password"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
