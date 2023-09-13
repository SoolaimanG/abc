import QRCode from "react-qr-code";

export const QrCodeComponent = ({ link }: { link: string }) => {
  //
  return (
    <div className="w-full border-solid border-[1.5px] border-gray-400 rounded-md flex items-center justify-center h-full">
      <QRCode
        bgColor="#0096FF"
        size={110}
        fgColor="#ffff"
        height={"100%"}
        width={"100%"}
        value={link}
      />
    </div>
  );
};
