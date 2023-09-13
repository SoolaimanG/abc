"use client";

import PhoneView from "@/Components/phoneView";
import { ContextAPI } from "@/Providers/provider";
import { PropertyState } from "@/Types/types";
import axios, { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";

const Page = ({ params }: { params: { username: string } }) => {
  console.log(params.username);

  const { dispatch } = useContext(ContextAPI);

  const [res, setRes] = useState<PropertyState | null>(null);

  const [states, setStates] = useState<{
    error: 404 | 500 | 0o0;
    loading: boolean;
    success: boolean;
  }>({
    loading: true,
    success: false,
    error: 0o0,
  });

  useEffect(() => {
    const getLinkInBio = async () => {
      await axios
        .post("/api/getlinkinbio", {
          username: params.username,
        })
        .then((response) => {
          console.log(response);
          setRes(JSON.parse(response.statusText));
          setStates({ ...states, success: true });
        })
        .catch((error: AxiosError) => {
          console.log(error);
          setStates({
            ...states,
            error: error.response?.status as 404 | 500 | 0o0,
          });
        })
        .finally(() => {
          setStates({ ...states, loading: false });
          dispatch({ type: "none" });
        });
    };

    getLinkInBio();
  }, []);

  if (states.loading) {
    dispatch({ type: "loading" });
    return <div className="w-full h-screen bg-white"></div>;
  }

  if (states.error === 404) {
    return <span>Username not found</span>;
  }

  return (
    <div className="md:w-1/2 md:m-auto w-full md:h-[40rem] h-screen flex items-center justify-center">
      <PhoneView {...(res as PropertyState)} />
    </div>
  );
};

export default Page;
