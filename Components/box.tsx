import Link from "next/link";
import React from "react";
import CountUp from "react-countup";

type boxProps = {
  title: string;
  count: number;
  link?: string;
  icon?: React.ReactElement;
};

const Box = (props: boxProps) => {
  const { title, count, icon, link } = props;
  return (
    <Link
      passHref
      href={`/app/${link}`}
      className="w-full flex h-[7rem] p-3 rounded-md cursor-pointer items-center gap-3 bg-white border-solid border-[1.5px] border-gray-400"
    >
      <span className="text-2xl bg-blue-300 rounded-md text-blue-700 p-2">
        {icon}
      </span>
      <div>
        <strong className="text-3xl">
          <CountUp end={count} duration={3} />
        </strong>
        <p className="text-xl text-gray-500">{title}</p>
      </div>
    </Link>
  );
};

export default Box;
