import { useEffect, useState } from "react";
import {
  Audio,
  EmailButton,
  FileButton,
  Text,
  URLButton,
  Video,
} from "./allBtnComp";
import AllModals from "./allModals";
import { useStore3 } from "@/Providers/zustand";

type props = {
  id: number;
  name: string;
  desc: string;
  icon: React.ReactElement;
};

const ContentToAddComp = (props: props) => {
  const { id, name, desc, icon } = props;
  const store = useStore3((state) => state);
  const [open, setOpen] = useState(false);

  let componentToRender;

  //!Was using ternary before but thought switch will be better
  switch (id) {
    case 1:
      componentToRender = <URLButton />;
      break;
    case 2:
      componentToRender = <EmailButton />;
      break;
    case 3:
      componentToRender = <FileButton />;
      break;
    case 6:
      componentToRender = <Audio />;
      break;
    case 7:
      componentToRender = <Video />;
      break;
    default:
      componentToRender = <Text />;
      break;
  }

  //To close model if user is done
  useEffect(() => {
    if (store.done) {
      setOpen(false);
      store.closeModal(false);
    }
  }, [store.done]);

  return (
    <AllModals
      button={
        <div
          onClick={() => setOpen(true)}
          className="bg-white cursor-pointer p-2 h-[8.2rem] md:h-[9rem] flex-col gap-1 w-full flex items-center justify-center rounded-lg"
        >
          <span className="text-xl">{icon}</span>
          <p className="text-lg text-center font-semibold">{name}</p>
          <p className="text-center text-gray-500">{desc}</p>
        </div>
      }
      open={open}
      setOpen={setOpen}
    >
      <div className="w-full h-full">{componentToRender}</div>
    </AllModals>
  );
};

export default ContentToAddComp;
