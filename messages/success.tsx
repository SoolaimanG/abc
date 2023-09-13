import React from "react";
import Lottie from "lottie-react";
import AnimationData from "../svg/success.json";

export type successProps = {
  message: string;
};

const Success = (props: successProps) => {
  return (
    <div className="w-fit greenColor-1 greenColor-2 px-3 rounded-lg flex p-1 relative items-center gap-2">
      <div>
        <Lottie
          className="w-[2.5rem] h-[2.5rem]"
          animationData={AnimationData}
          loop={false}
        />
      </div>
      <p className="text-lg">{props.message}</p>
    </div>
  );
};

export default Success;
