import { FaLink } from "react-icons/fa";

type props = {
  loading: boolean;
  showIcon: boolean;
  enableColor: boolean;
};

const Logo = (props: props) => {
  const { loading, showIcon, enableColor } = props;
  return (
    <div
      className={`flex cursor-pointer ${
        loading && "blinker"
      } items-center gap-2`}
    >
      {showIcon && <FaLink size={30} color={enableColor ? "white" : "black"} />}
      {(loading || showIcon) && (
        <div className={`h-[2.5rem] w-[1px] bg-black`} />
      )}
      <p className={`text-2xl text-4 ${enableColor && "text-blue-700"}`}>
        <strong className="text-5xl text-7">K</strong>onnect
      </p>
    </div>
  );
};

export default Logo;
