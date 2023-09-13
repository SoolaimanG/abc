import React, { useCallback, useContext, useRef } from "react";
import Button from "./button";
import { FcLink } from "react-icons/fc";
import { BsCalendar3 } from "react-icons/bs";
import { QrCodeComponent } from "@/Functions/funcComp";
import EmptyState from "./emptyState";
import { useFormatDate } from "@/Hooks";
import { toPng } from "html-to-image";
import { ContextAPI } from "@/Providers/provider";

const GenerateQrCode = ({ link, time }: { link: string; time: number }) => {
  const date = useFormatDate(time);
  const ref = useRef<HTMLDivElement>(null);
  const { dispatch } = useContext(ContextAPI);

  const downloadQrCode = useCallback(() => {
    if (!link) {
      return dispatch({ type: "warning", payload: "Nothing to download" });
    }

    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = window.document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
        dispatch({ type: "success", payload: "Image downloaded" });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div className="w-full bg-white rounded-md p-2">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-semibold text-xl">Qr Code</h2>
        <Button
          bigger={false}
          name={"Download"}
          filled={true}
          onClick={() => {
            downloadQrCode();
          }}
        />
      </div>
      {link ? (
        <div className="w-full flex gap-3 items-center">
          <div
            ref={ref}
            className="basis-[40%] items-center justify-center flex rounded-lg h-[7rem] bg-slate-400 w-full"
          >
            <QrCodeComponent link={link} />
          </div>
          <div className="basis-[55%] flex flex-col gap-2 w-full">
            <div className="flex items-center gap-1">
              <FcLink />
              <span>{link.length > 20 ? link.slice(0, 20) : link}</span>
            </div>
            <div className="flex text-blue-600 items-center gap-1">
              <BsCalendar3 />
              <p className="text-black">{date ? date : "null"}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <EmptyState title="No qr code to view" />
        </div>
      )}
    </div>
  );
};

export default GenerateQrCode;
