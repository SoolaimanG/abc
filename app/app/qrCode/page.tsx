"use client";

import ButtonTwo from "@/Components/buttonTwo";
import Input from "@/Components/input";
import SliderSizes from "@/Components/slider";
import { colorProps } from "@/Types/types";
import Message from "@/messages/message";
import { colors } from "@/utils/data";
import React, {
  SetStateAction,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { toPng } from "html-to-image";
import { ContextAPI } from "@/Providers/provider";
import QRCode from "react-qr-code";

const ColorComp = ({
  color,
  selectedColor,
  setSelectedColor,
}: {
  color: colorProps[];
  selectedColor: string;
  setSelectedColor: React.Dispatch<SetStateAction<string>>;
}) => {
  const removeWhite = color.filter((w) => w.code !== "#FFFFFF");
  return (
    <div className="w-full flex flex-wrap gap-3">
      {removeWhite.map((c, i) => (
        <div
          key={i}
          onClick={() => setSelectedColor(c.code)}
          className="rounded-full p-1 cursor-pointer"
          style={{
            border: selectedColor === c.code ? `1.5px solid ${c.code}` : "",
          }}
        >
          <div
            style={{
              background: c.code,
              padding: "4px",
            }}
            className={`w-[2rem] rounded-full h-[2rem]`}
          />
        </div>
      ))}
    </div>
  );
};

const BackgroundComp = ({
  color,
  selectedBgColor,
  setSelectedBgColor,
}: {
  color: colorProps[];
  selectedBgColor: string;
  setSelectedBgColor: React.Dispatch<SetStateAction<string>>;
}) => {
  const removeBlack = color.filter((b) => b.code !== "#000000");
  return (
    <div className="w-full flex flex-wrap gap-3">
      {removeBlack.map((c, i) => (
        <div
          key={i}
          className="rounded-full p-1 cursor-pointer"
          style={{
            border: selectedBgColor === c.code ? `1.5px solid ${c.code}` : "",
          }}
        >
          <div
            key={i}
            onClick={() => setSelectedBgColor(c.code)}
            style={{
              background: c.code,
              padding: "4px",
            }}
            className={`w-[2rem] rounded-full h-[2rem]`}
          />
        </div>
      ))}
    </div>
  );
};

const Page = () => {
  const [value, setValue] = useState("");
  const [states, setStates] = useState({
    active: "Color",
  });

  const [selectedColor, setSelectedColor] = useState("#00000");
  const [selectedBgColor, setSelectedBGColor] = useState("#FFFFFF");
  const [size, setSize] = useState(100);
  const { dispatch } = useContext(ContextAPI);
  const ref = useRef<HTMLDivElement>(null);

  //DOWNLOAD QR CODE
  const downloadQRCode = useCallback(() => {
    if (ref.current === null) {
      return dispatch({
        type: "error",
        payload: "Cannot download QR Code",
      });
    }

    if (value.length < 1) {
      return dispatch({
        type: "error",
        payload: "Cannot download empty QR Code",
      });
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = window.document.createElement("a");
        link.download = "myQrCode";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        dispatch({ type: "error", payload: "Error downloading Qr Code" });
      });
  }, [ref]);

  return (
    <div className="w-full h-fit pb-20 md:pb-0">
      <div className="w-full flex-col flex md:flex-row gap-3">
        <div className="w-full flex-col gap-3 flex basis-[60%]">
          <div className="w-full flex flex-col gap-3 bg-white rounded-md p-3">
            <p className="text-3xl text-black">
              1. Create a Qr Code for a website or a text
            </p>
            <form className="w-full flex gap-2 items-center">
              <AiOutlineGlobal />
              <Input
                value={value}
                setValue={setValue}
                disabled={false}
                includeBorder={true}
                placeholder="Enter your text here👇"
                type="text"
              />
            </form>
            <Message message="More feautures coming soon" />
          </div>
          <div className="w-full bg-white flex flex-col gap-3 rounded-md p-2">
            <p className="text-3xl">2. Setup your styles</p>
            <div className="w-full flex">
              {/*<div className="w-full">*/}
              <p className="text-left flex text-xl items-start justify-start">
                {states.active}
              </p>
              <div className="bg-blue-400 h-[2.3rem] w-2/3 m-auto justify-center flex items-center transition ease-linear rounded-lg">
                <button
                  onClick={() => setStates({ ...states, active: "Color" })}
                  className={`w-full h-full ${
                    states.active === "Color" &&
                    "bg-blue-800 rounded-lg text-white"
                  } text-center`}
                >
                  Color
                </button>
                <button
                  onClick={() => setStates({ ...states, active: "Background" })}
                  className={`w-full h-full ${
                    states.active === "Background" &&
                    "bg-blue-800 rounded-lg text-white"
                  } text-center`}
                >
                  Background
                </button>
                {/*</div>*/}
              </div>
            </div>
            <div className="w-full mt-3">
              {states.active === "Color" ? (
                <ColorComp
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  color={colors}
                />
              ) : (
                <BackgroundComp
                  color={colors}
                  selectedBgColor={selectedBgColor}
                  setSelectedBgColor={setSelectedBGColor}
                />
              )}
            </div>
            <div className="w-full mt-3">
              <SliderSizes value={size} setValue={setSize} defaultNum={size} />
            </div>
          </div>
        </div>
        <div className="w-full h-fit items-center justify-center flex py-3 flex-col gap-3 bg-white rounded-md basis-[40%]">
          <p className="px-2 text-xl text-blue-500 flex items-start justify-start">
            Qr Code
          </p>
          <hr />
          <div className="p-2 w-fit border-solid border-[1.4px] border-gray-400 rounded-md">
            <div className="" ref={ref}>
              <QRCode
                value={value}
                size={size * 2}
                bgColor={selectedBgColor}
                fgColor={selectedColor}
              />
            </div>
          </div>
          <hr />
          <span className="text-3xl text-left">3. Download Qr Code</span>
          <div className="px-2 w-full">
            <ButtonTwo
              disabled={false}
              text="Save Qr Code"
              rounded={true}
              hover={false}
              filled={true}
              onClick={downloadQRCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
