import { IconButton } from "@mui/material";
import {
  ChangeEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Input from "./input";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useStore3 } from "@/Providers/zustand";
import ButtonTwo from "./buttonTwo";
import { animationTypes } from "@/utils/data";
import { regexForEmail, regexForUrls } from "@/utils";
import { ContextAPI } from "@/Providers/provider";
import { btnProps } from "@/Types/types";

const BtnType = (props: {
  type: string;
  buttontypes: { id: number; type: string }[];
  selectBtn: string;
  setSelectBtn: React.Dispatch<SetStateAction<string>>;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState("");
  const [email, setEmail] = useState("");
  const [animation, setAnimation] = useState("");
  const [fileProp, setFileProps] = useState<null | File>(null);
  const store = useStore3((state) => state);
  const { dispatch } = useContext(ContextAPI);

  //Handle payload and send to the provider button
  const handleAddButton = () => {
    const id = Date.now();

    if (!buttonName) {
      return dispatch({
        type: "warning",
        payload: "A button must have a name",
      });
    }

    const checkFileNum = store.buttonProps.filter((b) => {
      return (b.file?.length as number) > 0;
    });

    if (checkFileNum.length >= 1) {
      return dispatch({ type: "warning", payload: "Can only accept one file" });
    }

    //
    const prop: btnProps = {
      id: id,
      type: props.selectBtn || props.type,
      animationType: animation || "none",
      name: buttonName,
      desc: description,
      url: url,
      file: file,
      email: email,
      views: 0,
      clicks: 0,
    };

    store.addButton(prop); //Sending payload to provider
    store.closeModal(true); //Close the modal
  };

  //This is to pass the file read to a state of string
  useEffect(() => {
    //If the file exists read the file
    if (fileProp) {
      const reader = new FileReader();
      reader.onload = (e) => {
        //
        setFile(e.target?.result as string);
      };

      reader.readAsDataURL(fileProp);
    }
  }, [fileProp]);

  //Select the file you want to select
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile?.size > 2.5 * 1024 * 1024) {
        //!if the file is too large return
        return dispatch({ type: "error", payload: "File is too large" });
      } else {
        setFileProps(selectedFile);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex h-full flex-col gap-2 bg-gray-200 rounded-md">
        <div
          onClick={() => {
            setShowDropdown((prev) => !prev);
          }}
          className="w-full flex relative items-center justify-between"
        >
          <div className="w-full px-1 py-2">
            Button Type:{" "}
            <span className="text-gray-500">
              {props.selectBtn || props.type}
            </span>
          </div>
          <IconButton>
            <MdOutlineKeyboardArrowDown />
          </IconButton>
          {/* DrapDown */}
          {showDropdown && (
            <div className="w-full p-2 border-solid border-[1.5px] border-gray-200 rounded-md absolute left-0 shadow-md bg-white top-0 mt-12">
              <div className="flex items-center mt-5 flex-col gap-2">
                {props.buttontypes.map((item) => (
                  <div
                    onClick={() => props.setSelectBtn(item.type)}
                    className="cursor-pointer hover:font-semibold hover:text-blue-600 w-full"
                    key={item.id}
                  >
                    <p>{item.type}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full px-1 rounded-md py-2 bg-white border-solid border-[1.5px] border-gray-200 shadow-lg">
        {props.selectBtn === "Url" && (
          <div>
            <span>Input your url here!</span>
            <Input
              includeBorder={true}
              disabled={false}
              type="text"
              value={url}
              setValue={setUrl}
              placeholder="https://www.example.com"
            />
          </div>
        )}
        {props.selectBtn === "File download" && (
          <form className="w-full" action="">
            <label
              className="w-full flex justify-between items-center"
              htmlFor="file"
            >
              <span className="text-lg">Upload a file</span>
              <span className="text-xl border-solid p-2 border-[1.5px] border-gray-300 rounded-full">
                <AiOutlineCloudUpload />
              </span>
              <input
                accept=".pdf, .doc, .txt, .csv, .xlsx, .pptx, .zip, .rar, .wav, .ogg"
                onChange={handleChange}
                className="hidden"
                type="file"
                name="file"
                id="file"
              />
            </label>
            {fileProp && <p>{fileProp.name}</p>}
          </form>
        )}
        {props.selectBtn === "Email" && (
          <div>
            <span>Input your email here!</span>
            <Input
              includeBorder={true}
              disabled={false}
              type="email"
              value={email}
              setValue={setEmail}
              placeholder="johndoe@gmail.com"
            />
          </div>
        )}
      </div>
      <div>
        <p>Button title</p>
        <Input
          includeBorder={true}
          disabled={false}
          type="text"
          value={buttonName}
          setValue={setButtonName}
          placeholder="My Personal Information"
        />
      </div>
      <div>
        <p>Description</p>
        <Input
          includeBorder={true}
          disabled={false}
          type="text"
          value={description}
          setValue={setDescription}
          placeholder="Optional"
        />
      </div>
      <div>
        {/* Animation types */}
        <div className="w-full bg-slate-200 cursor-pointer rounded-md px-2 py-1 relative">
          <div
            onClick={() => setShowDropdown2((prev) => !prev)}
            className="w-full flex items-center justify-between"
          >
            <p className="text-lg">
              Animation type:{" "}
              <span className="text-blue-600">{animation || "none"}</span>
            </p>
            <IconButton>
              <MdOutlineKeyboardArrowDown />
            </IconButton>
          </div>
          {showDropdown2 && (
            <div className="w-full absolute mt-12 bg-white border-solid border-[1.5px] border-gray-200 rounded-md flex flex-col gap-2 p-2 top-0 left-0">
              {animationTypes.map((type) => (
                <span
                  onClick={() => {
                    setAnimation(type.type);
                  }}
                  key={type.id}
                  className="text-lg cursor-pointer hover:text-blue-600 hover:font-semibold"
                >
                  {type.type}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        <ButtonTwo
          disabled={false}
          text="Done"
          rounded={true}
          onClick={() => {
            handleAddButton();
          }}
          hover={false}
          filled={true}
        />
      </div>
    </div>
  );
};

export default BtnType;
