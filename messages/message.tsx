import React from "react";
import { successProps } from "./success";
import Lottie from "lottie-react";
import AnimationData from "../svg/message.json";

const Message = (props: successProps) => {
  const { message } = props;
  return (
    <div className="w-full h-[3rem] px-3 text-white blueColor-2 rounded-lg flex p-1 relative items-center gap-2">
      <div>
        <Lottie
          className="w-[2rem] h-[2rem]"
          animationData={AnimationData}
          loop={false}
        />
      </div>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default Message;
