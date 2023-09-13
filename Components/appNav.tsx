"use client";

import { AppNavBar, uploadImageType } from "@/utils/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ConfirmPrompt from "./confirmPrompt";
import Button from "./button";
import Input from "./input";
import ButtonTwo from "./buttonTwo";
import TitleChip from "./titleChip";
import { BsCameraFill, BsFillCameraFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { UploadProfileImage } from "@/Functions/uploads";
import { observersProps } from "@/Types/types";
import axios from "axios";
import { ContextAPI } from "@/Providers/provider";
import { regexForPassword } from "@/utils";

//Using this to track the current state of the api response --> loading | error | success
const observers: observersProps = {
  loading: false,
  error: false,
  success: false,
  errorType: 500,
  setLoading: function (is_loading: boolean) {
    return (this.loading = is_loading);
  },
  setError: function (is_error: boolean) {
    return (this.error = is_error);
  },
  setErrorType: function (err: 400 | 500 | 404) {
    return (this.errorType = err);
  },
  setSuccess: function (is_successfull: boolean) {
    return (this.success = is_successfull);
  },
};

const AvatarComponent = ({ username }: { username: string }) => {
  const [avatarImg, setAvatarImg] = useState(
    `https://api.multiavatar.com/${username ? username : "Soolaiman"}.png`
  );

  const newImage = useCallback(() => {
    const id = Date.now();
    setAvatarImg(`https://api.multiavatar.com/${id}.png`);
  }, []);

  const useImage = async () => {
    observers.setLoading(true);

    await UploadProfileImage({
      url: avatarImg,
      username: username ? username : "SoolaimanG",
    })
      .then((response) => {
        console.log(response);
        observers.setSuccess(true);
        observers.setError(false);
      })
      .catch((err) => {
        console.log(err);
        observers.setError(true);
        //@ts-ignore
        observers.setErrorType(err.response?.status);
        observers.setSuccess(false);
        console.log(err);
      })
      .finally(() => {
        observers.setLoading(false);
        console.log(observers.loading);
      });
  };

  return (
    <div className="w-full mt-5 flex flex-col gap-3 items-center justify-center">
      <Image
        className="rounded-full m-auto"
        src={avatarImg}
        alt="avatar"
        width={130}
        height={130}
      />
      <div className="flex items-center gap-2">
        <Button
          name="New Image"
          filled={false}
          bigger={false}
          onClick={newImage}
        />
        <Button
          name="Use Image"
          filled={true}
          bigger={false}
          onClick={useImage}
        />
      </div>
    </div>
  );
};

const CameraComponent = ({ username }: { username: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<null | string>(null);

  const uploadImage = async () => {
    if (!photo) {
      return;
    }

    observers.setLoading(true);

    await UploadProfileImage({ url: photo, username: username })
      .then((response) => {
        console.log(response);
        observers.setSuccess(true);
        observers.setError(false);
      })
      .catch((err) => {
        console.log(err);
        observers.setError(true);
        //@ts-ignore
        observers.setErrorType(err.response?.status);
        observers.setSuccess(false);
        console.log(err);
      })
      .finally(() => {
        observers.setLoading(false);
      });
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    if (navigator.mediaDevices) {
      startCamera();
    } else {
      console.error("getUserMedia is not supported in this browser.");
    }
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      //@ts-ignore
      context.drawImage(videoRef.current, 0, 0, 640, 480);
      const photoData = canvasRef.current.toDataURL("image/jpeg");
      //@ts-ignore
      setPhoto(photoData);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-2xl text-blue-600">Snap with your camera 📸</p>
      <video ref={videoRef} autoPlay playsInline muted />
      <div className="w-full flex justify-center items-center gap-3">
        <IconButton onClick={takePhoto}>
          <BsFillCameraFill size={50} />
        </IconButton>
        {photo && (
          <button
            onClick={uploadImage}
            className="text-green-300 font-semibold"
          >
            Use picture
          </button>
        )}
        {photo && (
          <img
            className=" w-[3.5rem] h-[3.5rem] rounded-md"
            src={photo}
            alt="Captured Photo"
          />
        )}
      </div>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="640"
        height="480"
      />
    </div>
  );
};

const UploadComponent = ({ username }: { username: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState("");

  //Use this function to read the file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };

    reader.readAsDataURL(selectedFile as File);
  };

  const removeImage = () => {
    setFile(null);
    setImage("");
  };

  const uploadImage = async () => {
    if (!image) {
      return;
    }

    observers.setLoading(true);

    await UploadProfileImage({ url: image, username: username })
      .then((response) => {
        console.log(response);
        observers.setSuccess(true);
        observers.setError(false);
      })
      .catch((err) => {
        console.log(err);
        observers.setError(true);
        //@ts-ignore
        observers.setErrorType(err.response?.status);
        observers.setSuccess(false);
        console.log(err);
      })
      .finally(() => {
        observers.setLoading(false);
      });
  };

  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center h-full mt-3">
      {image && (
        <div className="w-fit relative">
          <img
            className="w-[4rem] cursor-pointer h-[4rem] rounded-md"
            src={image}
            alt="Image"
          />
          <span
            onClick={removeImage}
            className="absolute p- rounded-full bg-white top-0 -mr-1 right-0"
          >
            <AiOutlineClose />
          </span>
        </div>
      )}
      <label
        htmlFor="file"
        className="w-2/3 flex flex-col text-blue-700 cursor-pointer items-center justify-center gap-3 m-auto border-dashed border-[1.5px] border-blue-500 rounded-lg h-2/3"
      >
        <BsCameraFill size={35} />
        <span className="text-lg text-center">
          Click to select image from gallery
        </span>
        <input
          accept=".jpeg,.jpg,.png,.svg"
          onChange={handleFileChange}
          className="hidden"
          type="file"
          name="file"
          id="file"
        />
      </label>
      {image && (
        <Button
          name="Upload"
          filled={true}
          bigger={false}
          onClick={uploadImage}
        />
      )}
    </div>
  );
};

const AppNav = ({
  toggleNav,
  email,
  username,
  image,
}: {
  toggleNav: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  username: string;
  image: string;
}) => {
  const pathName = usePathname();
  const [online, setOnline] = useState(false); //To show user status online || offline
  const [showProfile, setShowProfile] = useState(false);
  const active = 2; //TODO:remove this later
  const [openModal, setOpenModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentType, setCurrentType] = useState("Avatar");
  const [passwordStrength, setPasswordStrength] = useState<"strong" | "weak">(
    "weak"
  );
  const { dispatch } = useContext(ContextAPI);

  const [openSecModal, setOpenSecModal] = useState(false);
  const colors = {
    weak: "text-red-500",
    strong: "text-green-500",
  };

  const path = pathName?.split("/")[2]; //Getting just the pathname without / included

  useEffect(() => {
    typeof window !== "undefined" && window.navigator.onLine
      ? setOnline(true)
      : setOnline(false);
  }, []);

  const changePassword = async () => {
    //Send payload to server

    await axios
      .post("/api/settings", {
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
      .then((res) => {
        console.log(res.data?.message);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //Show user notification base on current state
  useEffect(() => {
    const state = {
      type: observers.loading
        ? "loading"
        : observers.success
        ? "success"
        : "error",
      payload: observers.success
        ? "Profile Image Changed"
        : observers.error
        ? observers.errorType === 400
          ? "Invalid Parameters"
          : observers.errorType === 500
          ? "Internal Server Error"
          : "User not found"
        : "",
    };

    if (observers.loading || observers.error || observers.success) {
      //@ts-ignore
      dispatch(state);
    }
  }, [observers.loading, observers.error, observers.success]);

  useEffect(() => {
    if (regexForPassword.test(newPassword)) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("weak");
    }
  }, [newPassword]);

  return (
    <nav className="px-2 w-full">
      <ConfirmPrompt
        open={openSecModal}
        setOpen={setOpenSecModal}
        button={<></>}
      >
        <div className="w-full h-[20rem] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {uploadImageType.map((_, i) => (
              <button
                onClick={() => setCurrentType(_.name)}
                className={`px-3 py-1 bg-blue-200 text-blue-700 rounded-md ${
                  _.name === currentType && "bg-blue-600 text-white"
                }`}
                key={i}
              >
                {_.name}
              </button>
            ))}
          </div>

          {currentType === "Avatar" ? (
            <AvatarComponent username={username} />
          ) : currentType === "Camera" ? (
            <CameraComponent username={username} />
          ) : (
            <UploadComponent username={username} />
          )}
        </div>
      </ConfirmPrompt>
      <ConfirmPrompt open={openModal} setOpen={setOpenModal} button={<></>}>
        <div className="w-full">
          <div className="w-full flex items-center gap-3">
            <Image src={image} width={80} height={80} alt="Profile Pic" />
            <div className="flex items-center flex-col gap-2">
              <Button
                name="Change"
                filled={false}
                bigger={false}
                onClick={() => setOpenSecModal(true)}
              />
              <Button
                name="Remove"
                filled={true}
                bigger={false}
                onClick={() => {}}
              />
            </div>
          </div>
          <form className="w-full flex flex-col gap-3" action="">
            <p className="text-2xl text-blue-600">Personal Information</p>
            <Input
              value={username?.toUpperCase()}
              setValue={() => {}}
              includeBorder={false}
              placeholder=""
              disabled={true}
              type="text"
            />
            <Input
              value={email?.toUpperCase()}
              setValue={() => {}}
              includeBorder={false}
              placeholder=""
              disabled={true}
              type="text"
            />

            {/* Change Password */}
            <div className="w-full flex flex-col gap-3">
              <p className="text-2xl text-blue-600">Change Password</p>
              <Input
                value={oldPassword}
                setValue={setOldPassword}
                includeBorder={true}
                placeholder="Current Password"
                disabled={false}
                type="text"
              />
              <Input
                value={newPassword}
                setValue={setNewPassword}
                includeBorder={true}
                placeholder="New Password"
                disabled={false}
                type="password"
              />
              {newPassword && (
                <div className={`w-fit ${colors[passwordStrength]}`}>
                  <TitleChip
                    title={
                      passwordStrength === "weak"
                        ? "Weak Password"
                        : "Strong Password"
                    }
                  />
                </div>
              )}
              <ButtonTwo
                disabled={false}
                text="Change"
                rounded={true}
                hover={true}
                filled={true}
                onClick={() => {
                  changePassword;
                }}
              />
            </div>
          </form>
        </div>
      </ConfirmPrompt>
      <div className="w-full flex items-center justify-between">
        <p className="capitalize text-blue-500 md:w-fit md:text-3xl text-xl">
          {path}
        </p>
        <div className="flex w-full items-center md:w-fit gap-5">
          <div className="fixed left-0 md:left-auto bottom-0 mb-5 md:mb-0 md:relative w-full items-center">
            <div className="flex relative md:px-0 px-2 py-1 md:py-0 md:w-fit w-screen">
              <div className="flex w-[50%] width-6 px-4 py-2 md:w-fit md:p-0 md:bg-transparent rounded-lg bg-blue-100 m-auto items-center gap-5 justify-between md:justify-normal">
                {AppNavBar.map((navBar) => (
                  <div
                    key={navBar.id}
                    className={`text-xl text-gray-500 ${
                      active === navBar.id &&
                      "bg-blue-600 text-white p-2 rounded-lg"
                    } cursor-pointer`}
                  >
                    {navBar.name !== "Settings" ? (
                      <Link passHref href={`/app${navBar.path}`}>
                        {navBar.icon}
                      </Link>
                    ) : (
                      <Tooltip placement={"bottom"} title={navBar.name}>
                        <IconButton onClick={() => setOpenModal(true)}>
                          {navBar.icon}
                        </IconButton>
                      </Tooltip>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end items-center gap-3">
            <div className="text-xl block md:hidden text-gray-500 cursor-pointer">
              <Tooltip title="Menu">
                <IconButton onClick={() => toggleNav((prev) => !prev)}>
                  <FiMenu />
                </IconButton>
              </Tooltip>
            </div>
            <div className=" relative">
              <Tooltip title="Profile">
                <IconButton onClick={() => setShowProfile((prev) => !prev)}>
                  {image && (
                    <Image
                      alt={email}
                      src={image}
                      height={35}
                      width={35}
                      className="rounded-full"
                    />
                  )}
                </IconButton>
              </Tooltip>
              {showProfile && (
                <div className="absolute cursor-pointer mt-20 w-fit p-4 rounded-lg bg-gray-200 top-0 right-0">
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        online ? "bg-green-500" : "bg-red-500"
                      }`}
                    />
                    <span>{online ? "Online" : "Offline"}</span>
                  </div>
                  <p className="capitalize">{email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppNav;
