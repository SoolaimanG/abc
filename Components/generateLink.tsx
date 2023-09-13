"use client";

import React, { SetStateAction, useContext, useState } from "react";
import EmptyState from "./emptyState";
import { BsFillClipboardCheckFill, BsLink45Deg } from "react-icons/bs";
import { handleCopying, regexForUrls } from "@/utils";
import { ContextAPI } from "@/Providers/provider";
import axios from "axios";

const GenerateLink = ({
  user,
  link,
  setRefresh,
  setLink,
}: {
  user: string;
  link: string;
  setLink: React.Dispatch<SetStateAction<string>>;
  setRefresh: React.Dispatch<SetStateAction<boolean>>;
}) => {
  //const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");

  const { dispatch } = useContext(ContextAPI);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //check if email is valid
    const checkLink = regexForUrls.test(link);

    if (!checkLink) {
      return dispatch({ type: "warning", payload: "Invalid URL" });
    }

    if (!user) {
      return dispatch({ type: "warning", payload: "Login first" });
    }

    dispatch({ type: "loading" });
    setLoading(true);

    //Send a post to the server
    axios
      .post("https://konnect-api-soolaimang.onrender.com/generate-url", {
        link: link,
        user: user,
      })
      .then((res) => {
        dispatch({ type: "success", payload: "Link Shorten" });
        setGeneratedLink(res.data.newLink);
        setRefresh((prev) => !prev);
      })
      .catch((err) => {
        dispatch({ type: "error", payload: "Something went wrong" });
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setLink("");
      });
  };

  const copy = async () => {
    handleCopying(generatedLink).then(() => {
      dispatch({ type: "message", payload: "Link copied" });
    });
  };

  return (
    <div className="w-full h-full flex gap-3 flex-col p-2 bg-white rounded-md">
      <h2 className="text-2xl flex items-center gap-2 font-semibold">
        Short your link <BsLink45Deg />
      </h2>
      <p>Short and manage your link</p>
      <form
        className="flex w-ful p-1 md:bg-gray-100 md:h-[3rem] rounded-lg flex-col md:flex-row gap-4 md:gap-2"
        action=""
      >
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type="text"
          className="w-full h-[2.5rem] pl-1 md:pl-0 md:h-full rounded-md md:rounded-none bg-slate-100 md:bg-transparent outline-none"
        />
        <button
          disabled={loading}
          onClick={(e) => handleSubmit(e)}
          className="w-[50%] disabled:bg-gray-100 disabled:text-gray-500 md:w-[20%] bg-blue-500 px-2 md:px-3 py-2 md:py-1 rounded-md text-white"
        >
          Short link
        </button>
      </form>
      {/* Where created links are show */}
      <div className="w-full mt-4">
        {!generatedLink ? (
          <EmptyState title="No recent link created" />
        ) : (
          <div className="bg-gray-100 rounded-md flex items-center p-2">
            <p className="w-full text-lg">{generatedLink}</p>
            <button className="text-lg text-blue-500" onClick={copy}>
              <BsFillClipboardCheckFill />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateLink;
