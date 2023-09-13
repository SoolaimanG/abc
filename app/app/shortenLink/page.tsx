"use client";

import Box from "@/Components/box";
import { User } from "@/Types/types";
import Warning from "@/messages/warning";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ImStarFull } from "react-icons/im";
import { BsFillClipboard2CheckFill, BsLink45Deg } from "react-icons/bs";
import { GiClick } from "react-icons/gi";
import Input from "@/Components/input";
import { useContext, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import HistoryView from "@/Components/historyView";
import EmptyState from "@/Components/emptyState";
import { handleCopying, regexForUrls } from "@/utils";
import { ContextAPI } from "@/Providers/provider";

export interface resProps {
  link: string;
  path: string;
  createdOn: number;
  views: number;
  domain: String;
  randomString: string;
  createdBy: string;
  is_custom: Boolean;
}

const Page = () => {
  //--->Next Auth Session
  const { data } = useSession() as { data: User | null };

  //States to keep track of things
  const [link, setLink] = useState("");
  const [customName, setCustomName] = useState("");
  const [shows, setShows] = useState({
    views: 0,
    totalLinks: 0,
    customLinks: 0,
  });

  //Use this to send to the historyView
  const [responsetwo, setResponseTwo] = useState<resProps[]>([]);

  //For the custom toast
  const { dispatch } = useContext(ContextAPI);
  const [states, setStates] = useState({
    loading: false,
    refresh: false, //This is there to render a useEffect to fetch the latest data
  });

  const [response, setResponse] = useState("");
  const [errorCode, setErrorCode] = useState<500 | 409 | 400 | number>(500);

  //This Makes it alot easier to do mini maths functions
  const miniMathsFunctions = {
    //Calculate the total views of the user link
    calcTotalViews: (data: resProps[]) => {
      const totalViews = data.reduce((acc, arr) => {
        return acc + arr.views;
      }, 0);

      return totalViews;
    },
    //Calculates the total link created by the user
    calculateTotalLinks: function (data: resProps[]) {
      return data.length as number;
    },

    //If the link is custom count the link as custom -->is_custom
    calcTotalCustomLinks: function (data: resProps[]) {
      const customLinks = data.filter((l) => {
        return l.is_custom;
      });

      return customLinks.length as number;
    },
  };

  useEffect(() => {
    const getUserLinks = async () => {
      axios
        .get(
          `https://konnect-api-soolaimang.onrender.com/get-all-user-link/${data?.username}`
        )
        .then((response) => {
          setResponseTwo(response.data);
          setShows({
            views: miniMathsFunctions.calcTotalViews(response.data),
            customLinks: miniMathsFunctions.calcTotalCustomLinks(response.data),
            totalLinks: miniMathsFunctions.calculateTotalLinks(response.data),
          });
        })
        .catch(({ response }: AxiosError) => {
          dispatch({
            //Dispatch error according to the types
            type: "error",
            payload:
              response?.status === 404
                ? "User not found"
                : response?.status === 400
                ? "Bad request"
                : "Internal Server Error",
          });
        });
    };

    data && getUserLinks();
  }, [states.refresh, data]);

  const copyLink = () => {
    handleCopying(response).then(() => {
      dispatch({ type: "message", payload: "Link copied" });
    });
  };

  //Sending request
  const sendRequest = async () => {
    //Being defensive here so the client wont pass the wrong parameters
    if (!regexForUrls.test(link)) {
      return dispatch({ type: "warning", payload: "Invalid URL" });
    }

    dispatch({ type: "loading" });
    setResponse("");

    setStates({ ...states, loading: true });
    axios
      .post("https://konnect-api-soolaimang.onrender.com/create-custom-link", {
        username: data?.username,
        link: link,
        customName: customName.replace(" ", "-"),
      })
      .then((response) => {
        setStates({ ...states, loading: false });
        setResponse(response.data.newLink);
        setStates({ ...states, refresh: !states.refresh });
        dispatch({ type: "success", payload: "Custom link created.." });
        console.log(response);
      })
      .catch((error: AxiosError) => {
        setStates({ ...states, loading: false });
        setErrorCode(error.response?.status as number);

        dispatch({
          type: "error",
          payload: `${
            errorCode === 409
              ? "Custom name already exist"
              : errorCode === 500
              ? "Internal Server Error"
              : "Invalid parameter"
          }`,
        });
      });
  };

  return (
    <div className="w-full h-fit pb-5">
      <div className="w-full">
        {!data?.emailVerified && (
          <Link href={`/verify-email/${data?.email}`}>
            <Warning message="Your email is not verified" />
          </Link>
        )}
      </div>
      <div
        className={`w-full flex flex-col gap-2 ${
          !data?.emailVerified && "mt-3"
        }`}
      >
        <div className="grid-container-sm">
          <Box
            title="Total clicks"
            count={shows.views || 0}
            link=""
            icon={<GiClick />}
          />
          <Box
            title="Total links"
            count={shows.totalLinks || 0}
            link=""
            icon={<BsLink45Deg />}
          />
          <Box
            title="Custom links"
            count={shows.customLinks || 0}
            link=""
            icon={<ImStarFull color={"yellow"} />}
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <p className="text-2xl text-blue-400">
            Hey{" "}
            <strong className="text-blue-600 capitalize">
              {data?.username}
            </strong>{" "}
            did you know you can create custom links?
          </p>

          <div className="w-full rounded-md h-fit py-3 flex-col gap-3 flex items-center justify-center bg-white">
            <form className="md:w-2/3 w-full px-2 md:px-0 m-auto flex flex-col items-center gap-2">
              <Input
                includeBorder={true}
                disabled={false}
                value={link}
                setValue={setLink}
                type="text"
                placeholder="Your link here!"
              />
              <Input
                includeBorder={true}
                disabled={false}
                value={customName}
                setValue={setCustomName}
                type="text"
                placeholder="Your custom name here!"
              />

              <button
                onClick={sendRequest}
                disabled={states.loading}
                className="h-[2.5rem] disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-white w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold"
                type="submit"
              >
                Create
              </button>
            </form>
            {response && (
              <div className="md:w-2/3 w-full px-2 md:px-0 flex items-center gap-1">
                <Input
                  value={response}
                  setValue={() => {}}
                  type="text"
                  includeBorder={false}
                  placeholder=""
                  disabled={true}
                />
                <div
                  onClick={copyLink}
                  className="p-3 cursor-pointer rounded-md text-white bg-blue-600"
                >
                  <BsFillClipboard2CheckFill />
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-3">
            <h2 className="text-2xl text-blue-600">My links..</h2>
            <div>
              {(responsetwo.length as number) > 1 ? (
                //@ts-ignore
                <HistoryView data={responsetwo} />
              ) : (
                <EmptyState title="No record" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
