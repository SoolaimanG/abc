"use client";

import Error from "./error";
import Loading from "./loading";
import Success from "./success";
import Message from "./message";
import Warning from "./warning";
import { useContext, useEffect } from "react";
import { ContextAPI } from "@/Providers/provider";

type messageContainerProps = {
  message?: string;
  messageType?: string;
};

const MessageContainer = (props: messageContainerProps) => {
  const { messageType, message } = props;
  const { state, dispatch } = useContext(ContextAPI);

  //Setting the notification back to its original state(none)
  useEffect(() => {
    if (state.messageType !== "none" && state.messageType !== "loading") {
      setTimeout(() => {
        dispatch({ type: "none" });
      }, 3500);
    }
  }, [state.messageType]);

  return (
    <div>
      {messageType === "error" ? (
        <Error message={message as string} />
      ) : messageType === "loading" ? (
        <Loading />
      ) : messageType === "success" ? (
        <Success message={message as string} />
      ) : messageType === "message" ? (
        <Message message={message as string} />
      ) : messageType === "warning" ? (
        <Warning message={message as string} />
      ) : (
        <div className={"slide-out-right"} />
      )}
    </div>
  );
};

export default MessageContainer;
