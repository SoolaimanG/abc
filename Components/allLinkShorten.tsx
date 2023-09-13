"use client";

import { ContextAPI } from "@/Providers/provider";
import { handleCopying } from "@/utils";
import Link from "next/link";
import React, { useContext } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import EmptyState from "./emptyState";
import { useFormatDate } from "@/Hooks";

type secondComponentProps = {
  link: string;
  path: string;
  time: number;
};

export type firstComponentProps = {
  _id: string;
  link: string;
  path: string;
  createdOn: number;
  views: number;
  domain: string;
  randomString: string;
  createdBy: string;
};

const SecondComponent = (props: secondComponentProps) => {
  const { link, path, time } = props;
  const { dispatch } = useContext(ContextAPI);

  //Use this custom hook to format time
  const formatedDate = useFormatDate(time);

  //Copy to clipboard function
  const copy = async (text: string) => {
    await handleCopying(text).then(() => {
      dispatch({ type: "message", payload: "Link copied" });
    });
  };

  return (
    <div className="w-full flex flex-col gap-3 bg-gray-100 p-2 rounded-lg">
      <div className="w-full items-center flex justify-between">
        <h2 className="text-xl w-[15rem] break-words md:w-full font-semibold">
          {link.length > 20 ? link.slice(0, 20) + "..." : link}
        </h2>
        <div className="flex items-center gap-3">
          <span
            onClick={() => copy(path)}
            className="bg-blue-500 p-3 cursor-pointer rounded-lg text-white"
          >
            <BsFillClipboardCheckFill />
          </span>
          <span className="bg-blue-500 p-3 cursor-pointer rounded-lg text-white">
            <FaTelegramPlane />
          </span>
        </div>
      </div>
      <span className="text-gray-500">{path}</span>
      <hr className="bg-gray-500" />
      <div className="text-gray-500 flex items-center gap-3">
        <span>
          <AiOutlineClockCircle />
        </span>
        <p>{formatedDate}</p>
      </div>
    </div>
  );
};

const AllLinkShorten = ({ props }: { props: firstComponentProps[] }) => {
  const sort =
    props.length > 1 ? props.sort((a, b) => b.createdOn - a.createdOn) : [];

  return (
    <div className="w-full h-full flex flex-col gap-3 p-2 bg-white rounded-md">
      <div className="w-full items-center justify-between flex">
        <strong className="text-2xl">Links Shorten List</strong>
        {props.length >= 4 && (
          <Link className="text-blue-500 underline text-[0.9rem]" href={"/"}>
            See all
          </Link>
        )}
      </div>
      <div
        className={`flex flex-col ${
          props.length === 0 && "h-[5rem] flex items-center justify-center"
        } gap-2 w-full`}
      >
        {props?.length > 0 ? (
          sort?.slice(0, 3).map((p) => {
            return (
              <div key={p._id.toString()}>
                <SecondComponent
                  link={p.link}
                  path={p.path}
                  time={p.createdOn}
                />
              </div>
            );
          })
        ) : (
          <EmptyState title="No links shorten" />
        )}
      </div>
    </div>
  );
};

export default AllLinkShorten;
