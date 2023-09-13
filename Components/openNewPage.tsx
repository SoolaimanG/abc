import React, { SetStateAction } from "react";

type semiModelProps = {
  open: boolean;
  content: React.ReactNode;
  button?: React.ReactElement | React.ReactNode;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const OpenNewPage = (props: semiModelProps) => {
  const { open, setOpen, content } = props;
  return (
    <div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="w-full h-full z-10 absolute left-0 top-0 glassmorphism-black"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full h-1/2 z-20
     absolute rounded-t-lg bottom-0 left-0 bg-white gap-3"
          >
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenNewPage;
