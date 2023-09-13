import { useState } from "react";
import Input from "./input";
import Logo from "./logo";
import TitleChip from "./titleChip";
import Button from "./button";

const illustrationTabs = [
  {
    name: "ShortLink",
  },
  {
    name: "Microsite",
  },
  {
    name: "Custom Link",
  },
  {
    name: "Manage Link",
  },
];

const Illustration = (props: { dark: boolean }) => {
  const [value, setValue] = useState("");
  return (
    <div
      className={`w-full pb-6 rounded-lg p-2 flex ${
        props.dark ? "bg-black" : "bg-white"
      } flex-col gap-2`}
    >
      <div className="w-full flex items-center">
        <div className="flex gap-1 items-center">
          <div className="bg-red-500 w-2 h-2 rounded-full" />
          <div className="bg-yellow-300 w-2 h-2 rounded-full" />
          <div className="bg-green-500 w-2 h-2 rounded-full" />
        </div>
        <div className="w-full flex items-center justify-center">
          {" "}
          <TitleChip filled={true} title="konnect.com" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 md:px-6 px-4">
        <Logo loading={false} showIcon={true} enableColor={true} />
        <div className="w-full overflow-auto rounded-md flex px-2 justify-between items-center py-1 bg-gray-300">
          {illustrationTabs.map((tab, i) => (
            <button
              className={` ${i === 2 && "hidden md:block"} ${
                i === 3 && "hidden md:block"
              } ${
                i === 0
                  ? "bg-blue-600  text-[0.8rem] md:text-[1.1rem] rounded-lg px-2 py-1 text-white"
                  : "text-[#252525]"
              } font-medium`}
              key={i}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <p className="text-[#252525] text-left">Short your link</p>
        <div className="w-full flex-col md:flex-row flex gap-2">
          <Input
            disabled={true}
            placeholder={"Paste your link here and shorten it"}
            value={value}
            includeBorder={true}
            setValue={setValue}
            type="text"
          />
          <Button
            name="Shorten"
            filled={true}
            bigger={false}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Illustration;
