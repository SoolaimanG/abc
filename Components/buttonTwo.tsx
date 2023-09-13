import React from "react";

type buttonTwoProps = {
  disabled: boolean;
  text: string;
  rounded: boolean;
  hover: boolean;
  filled: boolean;
  icon?: React.ReactElement;
  onClick: () => void;
};

const ButtonTwo = (props: buttonTwoProps) => {
  const { disabled, text, rounded, filled, icon, hover, onClick } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onClick();
  };

  return (
    <button
      onClick={(e) => handleClick(e)}
      className={`w-full flex h-[3rem] gap-2 text-lg items-center justify-center ${
        rounded && "rounded-md"
      } ${hover && "hover:-translate-y-2 transition-all delay-150"} ${
        filled
          ? `${
              disabled
                ? "bg-slate-300 cursor-not-allowed text-white"
                : "bg-blue-600 text-white"
            }`
          : "border-blue-600 rounded-md border-solid border-[1.5px]"
      }`}
      disabled={disabled}
    >
      {icon && icon}
      {text}
    </button>
  );
};

export default ButtonTwo;
