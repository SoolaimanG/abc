import React from "react";
import { successProps } from "./success";
import Lottie from "lottie-react";
import AnimationData from "../svg/warning.json";

const Warning = (props: successProps) => {
  const { message } = props;
  return (
    <div className="w-full h-[3rem] px-3 yellowColor-1 yellowColor-2 rounded-lg flex p-1 relative items-center gap-2">
      <div className="w-[2.5rem] relative h-[2.5rem]">
        <Lottie
          className="w-[2.5rem] h-[2.5rem]"
          animationData={AnimationData}
          loop={false}
        />
      </div>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default Warning;
