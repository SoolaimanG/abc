"use client";

const Background = (props: {
  image: string;
  message: string;
  header: string;
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${props.image})` }}
      className="relative bg-cover items-center flex bg-center bg-no-repeat w-full h-full"
    >
      <div className="absolute z-10 w-full h-full gradient-1 top-0 left-0" />
      <div className="px-10 flex flex-col gap-5 text-white z-20">
        <h2 className="text-5xl hidden md:block">{props.message}</h2>
        <p className="text-lg hidden md:block">{props.header}</p>
      </div>
    </div>
  );
};

export default Background;
