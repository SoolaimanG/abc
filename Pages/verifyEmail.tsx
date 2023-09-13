"use client";

import AllModals from "@/Components/allModals";
import Button from "@/Components/button";
import Input from "@/Components/input";
import Logo from "@/Components/logo";
import { IconButton, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineExclamationCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ContextAPI } from "@/Providers/provider";
import { regexForEmail } from "@/utils";

const VerifyEmail = ({ params }: { params: string }) => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const route = useRouter();

  const { dispatch } = useContext(ContextAPI);

  const resendEmail = () => {
    //If the email is invalid
    if (!regexForEmail.test(email)) {
      dispatch({ type: "warning", payload: "Invalid email" });
      return;
    }
    //send post request
    dispatch({ type: "loading" });
    axios
      .post(`/api/send-verification`, {
        email: email,
      })
      .then((res) => {
        dispatch({ type: "success", payload: "Email Sent Successfully" });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "error",
          payload: "Unable to send verification email",
        });
      });
  };

  //Get the user email from token
  useEffect(() => {
    if (regexForEmail.test(params)) {
      return setEmail(params);
    }

    dispatch({ type: "loading" }); //Loading UI
    const getEmail = async () => {
      axios
        .get(`/api/verify-email/${params}`)
        .then((res) => {
          dispatch({ type: "success", payload: "Email gotten" });
          setEmail(res.statusText);
        })
        .catch((err) => {
          dispatch({ type: "error", payload: "Error getting email" });
        });
    };

    getEmail();

    return () => {}; //clean up
  }, []);

  const verifyEmailAddress = async () => {
    await axios
      .post("/api/verify-email", {
        token: email, ///Email --> Token
      })
      .then((response) => {
        route.push("/app/home");
        console.log(response);
      })
      .catch((error) => {
        dispatch({
          type: "error",
          payload: "Could not send verification email",
        });
        console.log(error);
      });
  };

  return (
    <div className="w-full relative flex flex-col md:flex-row overflow-hidden h-screen">
      <div className="absolute z-10 cursor-pointer top-0 right-0 mt-4 mr-4">
        <Tooltip title="Skip">
          <IconButton onClick={() => route.push("/app/home")}>
            <AiOutlineClose />
          </IconButton>
        </Tooltip>
      </div>
      <div className="basis-[30%] flex-col justify-center px-2 items-center md:justify-between py-4 w-full h-full bg-blue-50 flex">
        <div className="hidden md:block">
          {" "}
          <Logo enableColor={false} showIcon={true} loading={false} />
        </div>
        <h2 className="md:text-5xl text-7 text-3xl text-center md:text-left font-semibold">
          Please confirm the validity of your email.
        </h2>
        <div className="hidden md:flex text-gray-500 items-center gap-1">
          <AiOutlineExclamationCircle size={35} />
          <span>
            We need to verify your email for security reasons and for you to be
            able to access all app features
          </span>
        </div>
      </div>
      <div className="basis-[70%] relative items-center justify-center py-4 w-full h-full  flex">
        <div className="flex w-full flex-col px-3 gap-3">
          <h2 className="md:text-5xl text-6 text-3xl md:w-2/3 w-full font-semibold">
            Check your email for a verification link
          </h2>
          <label htmlFor="">
            Your email
            <Input
              value={email}
              setValue={setEmail}
              disabled={false}
              includeBorder={true}
              placeholder="Johndoe@gmail.com"
              type="email"
            />
          </label>
          <p className="text-lg text-4 text-gray-500">
            Didnt receive the email?Please check the spam folder or try to
            resend the email with your correct email
          </p>
          <div className="w-full flex items-center md:mt-0 mt-3">
            <div className="w-full flex items-start justify-start">
              <AllModals
                button={
                  <button
                    onClick={() => setOpenModal((prev) => !prev)}
                    className="text-blue-600 w-full text-[1rem]"
                  >
                    Terms of Service
                  </button>
                }
                open={openModal}
                setOpen={setOpenModal}
              >
                <h1 className="text-center text-4xl font-semibold">
                  Terms of Service
                </h1>

                <p className="text-lg">
                  <strong className="text-xl"> Use of the Service:</strong> The
                  link aggregator web app (the Service) is provided by{" "}
                  <span className="text-blue-600">Konnect</span>, By using the
                  Service, you agree to be bound by these Terms of Service and
                  our User Privacy
                </p>

                <p className="text-lg">
                  <strong className="text-xl"> Eligibility:</strong> You must be
                  at least 12 years old to use the Service. By using the
                  Service, you represent and warrant that you meet this
                  requirement.
                </p>

                <p className="text-lg">
                  <strong className="text-xl"> Content:</strong> The Service
                  allows users to submit links to websites, articles, and other
                  online resources (collectively, Content). By submitting
                  Content, you represent and warrant that you own all rights to
                  such Content, or have obtained all necessary permissions and
                  licenses to use such Content. You further represent and
                  warrant that the Content does not violate any laws or
                  regulations, and does not contain any harmful, unethical,
                  racist, sexist, toxic, dangerous, or illegal content.
                </p>

                <p className="text-lg">
                  <strong className="text-xl"> License Grant:</strong> By
                  submitting Content to the Service, you grant us a worldwide,
                  royalty-free, non-exclusive, sublicensable, and transferable
                  license to use, reproduce, prepare derivative works of,
                  display, perform, and distribute the Content in connection
                  with the Service and our business, including for marketing and
                  advertising purposes.
                </p>

                <p className="text-lg">
                  <strong className="text-xl"> User Conduct:</strong> You agree
                  to use the Service only for lawful purposes, and to comply
                  with all applicable laws and regulations. You further agree
                  not to engage in any conduct that could damage or impair the
                  Service, or interfere with others use of the Service.
                </p>

                <p className="text-lg">
                  <strong className="text-xl"> Ownership:</strong> All right,
                  title, and interest in and to the Service, including all
                  intellectual property rights therein, are owned by us or our
                  licensors. You do not acquire any ownership rights by using
                  the Service.
                </p>

                <p className="text-lg">
                  <strong className="text-xl">Disclaimer of Warranties:</strong>{" "}
                  THE SERVICE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS,
                  WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. WE
                  SPECIFICALLY DISCLAIM ALL WARRANTIES OF MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
                </p>

                <p className="text-lg">
                  <strong className="text-xl">
                    {" "}
                    Limitations of Liability:
                  </strong>{" "}
                  IN NO EVENT SHALL WE BE LIABLE TO YOU FOR ANY DAMAGES ARISING
                  OUT OF OR RELATED TO THE USE OF THE SERVICE, INCLUDING ANY
                  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR
                  CONSEQUENTIAL DAMAGES.
                </p>

                <p className="text-lg">
                  <strong className="text-xl"> Governing Law:</strong> These
                  Terms shall be governed by and construed in accordance with
                  the laws of NIGERIA. Any disputes arising out of or related to
                  these Terms shall be resolved through binding arbitration in
                  accordance with the rules of the American Arbitration
                  Association.
                </p>
              </AllModals>
            </div>
            <div className="w-full justify-end md:gap-5 gap-3 flex items-end">
              <Button
                filled={false}
                onClick={() => {
                  resendEmail();
                }}
                name="Resend"
                bigger={false}
              />
              <Button
                filled={true}
                onClick={() => {
                  verifyEmailAddress();
                }}
                name="Verify"
                bigger={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
