type buttonProps = {
  name: string;
  filled: boolean;
  bigger: boolean;
  onClick: () => void;
};

const Button = (props: buttonProps) => {
  const { name, bigger, filled, onClick } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      onClick={(e) => handleClick(e)}
      className={`px-7 transition-all delay-200 padding-3 ${
        bigger &&
        "px-12 padding-7 hover:-translate-y-2 delay-[.2s] ease-linear transition font-semibold py-4"
      } rounded-lg py-2 ${
        filled
          ? "bg-blue-600 text-white"
          : "border-solid text-blue-600 border-blue-500 border-[1.5px]"
      }`}
    >
      {name}
    </button>
  );
};

export default Button;
