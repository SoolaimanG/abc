import { SetStateAction, useContext, useEffect, useState } from "react";
import BtnType from "./btnType";
import { buttontypes } from "@/utils/data";
import { IconButton } from "@mui/material";
import Input from "./input";
import { BsFillPlayCircleFill } from "react-icons/bs";
import ButtonTwo from "./buttonTwo";
import { useStore3 } from "@/Providers/zustand";
import { regexForAudio, regexForVideo } from "@/utils";
import { ContextAPI } from "@/Providers/provider";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player/youtube";
import { RiDeleteBin4Line } from "react-icons/ri";
//import ReactQuill from "react-quill";
//import "react-quill/dist/quill.snow.css";

const buttonTypes = (props: {
  t: string;
  selectBtn: string;
  setSelectBtn: React.Dispatch<SetStateAction<string>>;
}) => {
  const { selectBtn, setSelectBtn, t } = props;
  return (
    <div className="w-full flex-col flex gap-3">
      <p className="text-lg w-full font-semibold text-center">
        Customize your button
      </p>
      <BtnType
        selectBtn={selectBtn}
        setSelectBtn={setSelectBtn}
        buttontypes={buttontypes}
        type={t}
      />
    </div>
  );
};

//Add Url Buttons
export const URLButton = () => {
  const [selectBtn, setSelectBtn] = useState("Url");
  return (
    <div className="w-full h-full">
      {buttonTypes({
        selectBtn: selectBtn,
        setSelectBtn: setSelectBtn,
        t: selectBtn,
      })}
    </div>
  );
};

//Add email button
export const EmailButton = () => {
  const [selectBtn, setSelectBtn] = useState("Email");
  return (
    <div className="w-full h-full">
      {buttonTypes({
        selectBtn: selectBtn,
        setSelectBtn: setSelectBtn,
        t: selectBtn,
      })}
    </div>
  );
};

//Add file button
export const FileButton = () => {
  const [selectBtn, setSelectBtn] = useState("File download");
  return (
    <div className="w-full h-full">
      {buttonTypes({
        selectBtn: selectBtn,
        setSelectBtn: setSelectBtn,
        t: selectBtn,
      })}
    </div>
  );
};

//Add Audio Files
export const Audio = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [audioReady, setAudioReady] = useState(false);
  const store = useStore3((state) => state);
  const { dispatch } = useContext(ContextAPI);

  const addAudio = () => {
    //-->Check if the audio is valid<--
    if (!regexForAudio.test(audioUrl)) {
      return dispatch({ type: "warning", payload: "Invalid audio URL" });
    }

    if (store.audio.length === 1) {
      return dispatch({
        type: "warning",
        payload: "Only one audio is allowed",
      });
    }

    store.addAudio(audioUrl);
    setAudioReady(true);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-lg text-center text-blue-600">New Audio Button</p>
      <div className="w-full flex flex-col gap-3">
        <p>
          Input your audio url from{" "}
          <span className="text-blue-600">soundcloud,apple music</span> others
        </p>
        <Input
          disabled={false}
          type="text"
          placeholder="Audio url"
          includeBorder={true}
          value={audioUrl}
          setValue={setAudioUrl}
        />
        <ButtonTwo
          rounded={true}
          disabled={false}
          text="Save"
          filled={true}
          onClick={() => {
            addAudio();
          }}
          hover={false}
        />
      </div>
      {audioReady ? (
        <div className="w-full h-[15rem] flex items-center justify-center bg-gray-100 rounded-md">
          <ReactAudioPlayer
            className="w-full h-full"
            src={audioUrl}
            controls
            autoPlay
          />
        </div>
      ) : (
        <div className="w-full h-[15rem] flex items-center justify-center bg-gray-100 rounded-md">
          <IconButton>
            <BsFillPlayCircleFill size={50} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

//Add Video Player
export const Video = () => {
  const [videoReady, setVideoReady] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const store = useStore3((state) => state);
  const { dispatch } = useContext(ContextAPI);

  useEffect(() => {
    if (videoUrl) {
      setVideoReady(true);
    } else {
      setVideoReady(false);
    }
  }, [videoUrl]);

  const addVideo = () => {
    if (!videoUrl && !regexForVideo.test(videoUrl)) {
      return dispatch({ type: "warning", payload: "Client Error (Warn)" });
    }

    if (store.video.length === 1) {
      return dispatch({
        type: "warning",
        payload: "Only one video is allowed",
      });
    }

    store.addVideo(videoUrl);
    store.closeModal(true);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-lg text-center text-blue-600">New Video Button</p>
      <div className="w-full flex flex-col gap-3">
        <p>Input a youtube video url</p>
        <Input
          disabled={false}
          type="text"
          placeholder="Video url"
          includeBorder={true}
          value={videoUrl}
          setValue={setVideoUrl}
        />
      </div>
      <div className="w-full h-[15rem] flex items-center justify-center bg-gray-100 rounded-md">
        {videoReady ? (
          <ReactPlayer width={"100%"} height={"100%"} controls url={videoUrl} />
        ) : (
          <IconButton>
            <BsFillPlayCircleFill size={50} />
          </IconButton>
        )}
      </div>
      <ButtonTwo
        disabled={false}
        hover={false}
        onClick={addVideo}
        filled={true}
        text="Done"
        rounded={true}
      />
    </div>
  );
};

//Add text to the list
export const Text = () => {
  const [text, setText] = useState("");
  const { dispatch } = useContext(ContextAPI);
  const store = useStore3((state) => state);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      ["link"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const addText = () => {
    if (!text) {
      return dispatch({ type: "warning", payload: "Input cannout be empty" });
    }

    store.addText(text);
    store.closeModal(true);
  };
  return (
    <div className="w-full h-full">
      <div className="w-full">
        <p className="w-full text-center text-lg text-blue-600">
          Add a text to your page
        </p>
      </div>
      <div className="flex w-full flex-col gap-3">
        {/*<ReactQuill
          //style={{ height: "1", position: "relative" }}
          modules={modules}
          value={text || ""}
          onChange={setText}
        />*/}
        <div className="w-full p-2 bg-gray-50 h-[10rem]">
          {text ? (
            <div dangerouslySetInnerHTML={{ __html: text }} />
          ) : (
            <p className="text-xl"> Edit your text the way you want it</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        <ButtonTwo
          disabled={false}
          hover={false}
          onClick={addText}
          filled={true}
          text="Done"
          rounded={true}
        />
      </div>
    </div>
  );
};

interface deleteHoverProps {
  func: () => void;
}

export const DeleteHover = (props: deleteHoverProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.func();
  };

  return (
    <div className="absolute w-full h-full glassmorphism-black left-0 top-0">
      <div className="z-10 w-full flex items-center justify-center">
        <IconButton onClick={handleClick}>
          <RiDeleteBin4Line />
        </IconButton>
      </div>
    </div>
  );
};
