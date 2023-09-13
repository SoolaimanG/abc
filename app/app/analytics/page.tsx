"use client";

//import LineGraph from "@/Components/lineGraph";
import { User } from "@/Types/types";
import Warning from "@/messages/warning";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const { data } = useSession() as { data: User | null };
  return (
    <div className="w-full h-screen">
      {!data?.emailVerified && <Warning message="Your email is not verified" />}
      {/*<div className="w-full mt-5 md:w-[90%] md:m-auto">
        <LineGraph />
      </div>*/}
    </div>
  );
};

export default Page;
