import Lottie from "lottie-react";
import AnimationData from "../svg/error.json";
import { successProps } from "./success";

const Error = (props: successProps) => {
  const { message } = props;
  return (
    <div className="w-full h-[3rem] px-3 redColor-1 redColor-2 rounded-lg flex p-1 relative items-center gap-2">
      <div>
        <Lottie
          className="w-[2.5rem] h-[2.5rem]"
          animationData={AnimationData}
          loop={false}
        />
      </div>
      <p className="text-[0.9rem] md:text-lg">{message}</p>
    </div>
  );
};

export default Error;
