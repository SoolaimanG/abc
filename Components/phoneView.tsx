import { IconButton } from "@mui/material";
import Image from "next/image";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiShare, BiSolidShareAlt } from "react-icons/bi";
import FooterBlock from "./footerBlock";
import { useStore3 } from "@/Providers/zustand";
import { BsFillCloudDownloadFill, BsQrCode, BsSnapchat } from "react-icons/bs";
import { examplebtn, oldFashionBtn, socialMediaPlatforms } from "@/utils/data";
import { useContext, useState } from "react";
import ReactPlayer from "react-player";
import ReactAudioPlayer from "react-audio-player";
import OpenNewPage from "./openNewPage";
import { Divider } from "./design";
import ButtonTwo from "./buttonTwo";
import { IoIosArrowForward } from "react-icons/io";
import QRCode from "react-qr-code";
import { ContextAPI } from "@/Providers/provider";
import { DeleteHover } from "./allBtnComp";
import { useSession } from "next-auth/react";
import { PropertyState, User } from "@/Types/types";
import React from "react";
import Link from "next/link";

const PhoneView = (props: PropertyState) => {
  const {
    profilePicBorder,
    profileBio,
    profilePicture,
    profilePictureShadow,
    secondaryBGColor,
    haveSecondary,
    bioCollapse,
    text,
    textColor,
    buttonColor,
    buttonProps,
    buttonBorderRadius,
    backgroundColor,
    buttonShadow,
    buttonType,
    backgroundImage,
    backgroundType,
    enableShareButton,
    secondaryTypes,
    audio,
    video,
    socialMedia,
    socialMediaIconSize,
    font,
    gap,
    addBorderToSocialIcon,
    buttonBackgroundColor,
    isLinear,
    firstColor,
    secondColor,
    hideName,
    secondaryImage,
    hideBio,
    hideSocial,
    isProd,
  } = props;

  const path = "location" in window ? window.location.href : null;
  const [hover, setHover] = useState(false);
  const store = useStore3((state) => state);

  //Collaps Bio
  const collapseBio = () => {
    return (
      <p>
        {(profileBio?.length as number) < 40
          ? profileBio
          : profileBio?.slice(0, 40) + "...."}
      </p>
    );
  };

  const checkBtnBg =
    buttonType === "glassmorphism"
      ? {
          background: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(7px)",
          border: "1px solid rgba(255, 255, 255, 0.175)",
        }
      : buttonType === "solid"
      ? {
          backgroundColor: `${buttonBackgroundColor}`,
        }
      : { ...oldFashionBtn };

  //Each button styles
  const eachBtnStyles = {
    //
    ...checkBtnBg,
    borderRadius: `${Math.floor((buttonBorderRadius as number) / 3.33)}px`,
    color: `${buttonColor}`,
  };

  //Button Styles
  const buttonStyles = {
    gap: gap ? `${Math.floor(gap / 5.5)}px` : "5px",
  };

  //Profile Styles
  const profilePicStyles = {
    boxShadow: `${(profilePictureShadow as number) / 20}px ${
      (profilePictureShadow as number) / 20
    }px ${(profilePictureShadow as number) / 10}px ${textColor || "#252525"}`,
    borderRadius: `${(profilePicBorder as number) / 2}% `,
  };

  //Set background according to user preferences
  const checkBgTypes =
    backgroundType === "color"
      ? {
          backgroundColor: `${backgroundColor}`,
        }
      : backgroundType === "gradient"
      ? {
          background: isLinear
            ? `linear-gradient(90deg, ${firstColor}, ${secondColor})`
            : `radial-gradient(circle, ${firstColor}, ${secondColor})`,
        }
      : backgroundType === "image"
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }
      : null;

  //Body Styles
  const bodyStyles = {
    ...checkBgTypes,
    color: textColor ? textColor : "#252525",
  };

  //Social Media Icons styles
  const socialMediaIconStyles = {
    width: `${socialMediaIconSize as number}px`,
  };

  const condition =
    haveSecondary && secondaryTypes === "Image"
      ? {
          backgroundImage: `url(${secondaryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {
          background: secondaryBGColor,
        };

  //Secondary Background Styles
  const secondaryBGColorStyle = {
    ...condition,
    backdropFilter: "7px",
  };

  //Social Icon Border
  const socialIconBorderStyles = {
    border: addBorderToSocialIcon ? `1.5px solid ${textColor}` : "",
  };

  //States
  const [openSemiModal, closeSemiModal] = useState(false);
  const [whatToShow, setWhatToShow] = useState<"qrCode" | "">("");
  const { dispatch } = useContext(ContextAPI);

  const share = async () => {
    const shareData = {
      title: "Konnect Link In Bio",
      text: `Check out ${data?.username} link with Konnect`,
      url: path as string,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      dispatch({ type: "error", payload: "Share not supported" });
    }
  };

  const handleDelete = (id: number) => {
    !isProd && store.deleteButton(id);
  };

  const { data } = useSession() as { data: User | null };

  return (
    <div
      style={bodyStyles}
      className={`w-full relative ${
        font === "Ubuntu"
          ? "ubuntu"
          : font === "Libre"
          ? "libre"
          : font === "OpenSans"
          ? "openSans"
          : "spectral"
      } h-full bg-[url] overflow-auto bg-cover bg-center bg-black flex-col gap-2 flex items-center`}
    >
      {openSemiModal && (
        <OpenNewPage
          button={<>Close</>}
          open={openSemiModal}
          setOpen={closeSemiModal}
          content={
            <div className="w-full p-1">
              <div className="w-full flex items-end justify-end">
                <p className="w-full text-2xl font-semibold justify-center flex items-center">
                  Soolaiman
                </p>
                <IconButton
                  onClick={() => {
                    whatToShow === "qrCode"
                      ? setWhatToShow("")
                      : closeSemiModal(false);
                  }}
                  className="items-end justify-end flex"
                >
                  <AiFillCloseCircle />
                </IconButton>
              </div>
              {whatToShow === "qrCode" ? (
                <div className="w-full flex-col gap-2 items-center justify-center flex h-full">
                  <QRCode width={70} height={70} value={path as string} />
                  <p>{path}</p>
                </div>
              ) : (
                <div>
                  <div className="w-full mt-6 flex flex-col gap-2">
                    <div
                      onClick={() => {
                        share();
                      }}
                      className="w-full px-1 hover:bg-gray-100 py-3 rounded-md cursor-pointer items-center flex justify-between"
                    >
                      <div className="w-full gap-2 flex items-center">
                        <BiShare />
                        <strong className="text-lg">Share this profile</strong>
                      </div>
                      <IoIosArrowForward />
                    </div>
                    <div
                      onClick={() => {
                        setWhatToShow("qrCode");
                      }}
                      className="w-full hover:bg-gray-100 px-1 py-3 rounded-md cursor-pointer items-center flex justify-between"
                    >
                      <div className="w-full flex gap-2 items-center">
                        <BsQrCode />
                        <strong className="text-lg">Qr Code</strong>
                      </div>
                      <IoIosArrowForward />
                    </div>
                  </div>
                  <Divider text="Join" />
                  <div className="w-full mt-7 flex flex-col gap-4 items-center justify-center">
                    <ButtonTwo
                      disabled={false}
                      onClick={() => {}}
                      text="Sign Up"
                      rounded={false}
                      hover={false}
                      filled={true}
                    />
                    <ButtonTwo
                      disabled={false}
                      onClick={() => {}}
                      text="Learn More"
                      rounded={false}
                      hover={false}
                      filled={true}
                    />
                  </div>
                </div>
              )}
            </div>
          }
        />
      )}

      {/* buttons */}
      <div className="relative w-full">
        {haveSecondary ? (
          <div className="w-full h-[10rem]">
            <div
              style={secondaryBGColorStyle}
              className={`w-full ${
                secondaryTypes === "Image" &&
                "bg-[url] bg-no-repeat bg-cover bg-center"
              } h-full flex flex-col items-start justify-start`}
            >
              <div className={`w-full flex items-center justify-between`}>
                <div className={`flex items-start justify-start w-full`}>
                  {enableShareButton && (
                    <IconButton onClick={() => closeSemiModal(true)}>
                      <span style={{ color: textColor }}>
                        <BiSolidShareAlt />
                      </span>
                    </IconButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`flex items-start justify-start w-full`}>
            {enableShareButton && (
              <IconButton onClick={() => closeSemiModal(true)}>
                <span style={{ color: textColor }}>
                  <BiSolidShareAlt />
                </span>
              </IconButton>
            )}
          </div>
        )}
        <div
          className={`w-full ${
            haveSecondary && "absolute -mb-7 bottom-0"
          } h-fit flex mt-5 items-center justify-center`}
        >
          <Image
            style={profilePicStyles}
            width={70}
            height={70}
            src={
              profilePicture || isProd
                ? (profilePicture as string)
                : (data?.image as string)
            }
            priority
            alt="Image"
          />
        </div>
      </div>
      <div
        className={`text-center w-full ${
          haveSecondary && "mt-7"
        } flex items-center justify-center`}
      >
        {/* TODO:Come back here and fix this...! and make it the background */}
        <div className="flex flex-col w-full gap-1 items-center">
          <p className="text-xl font-semibold">{data?.username}</p>
          {!hideBio && (
            <span className="text-[0.9rem] break-words w-2/3 text-center">
              {bioCollapse
                ? collapseBio()
                : profileBio || "I am graphic designer"}
            </span>
          )}
        </div>
      </div>

      {!hideSocial && (
        <div className="w-full px-2 items-center justify-center flex gap-1">
          {(socialMedia?.length as number) > 0 ? (
            <div
              style={buttonStyles}
              className="w-full flex flex-wrap items-center justify-center gap-2"
            >
              {socialMedia?.map((social) => {
                return (
                  <Link
                    style={{
                      ...socialIconBorderStyles,
                      color: social.color,
                    }}
                    className={`text-[0.8rem] cursor-pointer rounded-lg p-1 flex items-center gap-1`}
                    key={social.id}
                    href={(social.link as string) || "/"}
                    passHref
                  >
                    <Image
                      src={social.icon as string}
                      alt="Icon"
                      width={socialMediaIconSize}
                      height={socialMediaIconSize}
                      style={socialMediaIconStyles}
                    />
                    {!hideName && <span>{social.name}</span>}
                  </Link>
                );
              })}
            </div>
          ) : (
            <React.Fragment>
              {!isProd && (
                <>
                  <div
                    style={{
                      ...socialIconBorderStyles,
                    }}
                    className={`text-[0.8rem] cursor-pointer rounded-lg p-1 flex items-center gap-1`}
                  >
                    <Image
                      src={socialMediaPlatforms[8].icon as string}
                      alt="Icon"
                      width={socialMediaIconSize}
                      height={socialMediaIconSize}
                      style={socialMediaIconStyles}
                    />
                    {!hideName && <span>{socialMediaPlatforms[8].name}</span>}
                  </div>
                  <div
                    style={{
                      ...socialIconBorderStyles,
                    }}
                    className={`text-[0.8rem] cursor-pointer rounded-lg p-1 flex items-center gap-1`}
                  >
                    <Image
                      src={socialMediaPlatforms[10].icon as string}
                      alt="Icon"
                      width={socialMediaIconSize}
                      height={socialMediaIconSize}
                      style={socialMediaIconStyles}
                    />
                    {!hideName && <p> {socialMediaPlatforms[10].name}</p>}
                  </div>
                </>
              )}
            </React.Fragment>
          )}
        </div>
      )}
      <div className="w-full px-2 flex flex-col mt-5">
        {(buttonProps?.length as number) > 0 ? (
          <div className="flex flex-col" style={buttonStyles}>
            {buttonProps?.map((btn) => (
              <div key={btn.id} className="w-full gap-2 flex flex-col">
                {btn.url ? (
                  <a
                    onMouseEnter={() => {
                      !isProd && setHover(true);
                    }}
                    onMouseLeave={() => {
                      !isProd && setHover(false);
                    }}
                    style={eachBtnStyles as any}
                    className={`w-full relative ${
                      buttonShadow === "soft" && "shadow-md"
                    } ${buttonShadow === "solid" && "shadow-xl"} ${
                      buttonShadow === "none" && ""
                    } flex items-center ${
                      buttonType === "solid"
                        ? ""
                        : buttonType === "glassmorphism"
                        ? "glassmorphism"
                        : buttonType === "old-fashion"
                        ? ""
                        : ""
                    } justify-center ${
                      btn.animationType === "pulse"
                        ? "heartbeat"
                        : btn.animationType === "blick"
                        ? "blinker"
                        : btn.animationType === "bounce"
                        ? "bounce-top"
                        : ""
                    } text-lg h-[3rem]`}
                    href={btn.url}
                  >
                    {hover && (
                      <DeleteHover
                        func={() => {
                          handleDelete(btn.id);
                        }}
                      />
                    )}
                    {btn.name}
                  </a>
                ) : btn.email ? (
                  <a
                    onMouseEnter={() => {
                      !isProd && setHover(true);
                    }}
                    onMouseLeave={() => {
                      !isProd && setHover(false);
                    }}
                    style={eachBtnStyles as any}
                    className={`w-full relative ${
                      buttonShadow === "soft" && "shadow-md"
                    } ${buttonShadow === "solid" && "shadow-xl"} ${
                      buttonShadow === "none" && ""
                    } flex items-center  ${
                      btn.animationType === "pulse"
                        ? "heartbeat"
                        : btn.animationType === "blick"
                        ? "blinker"
                        : btn.animationType === "bounce"
                        ? "bounce-top"
                        : ""
                    } justify-center text-lg h-[3rem]`}
                    href={`mailto:${btn.email}`}
                  >
                    {hover && <DeleteHover func={() => handleDelete(btn.id)} />}
                    {btn.name}
                  </a>
                ) : (
                  <a
                    onMouseEnter={() => {
                      !isProd && setHover(true);
                    }}
                    onMouseLeave={() => {
                      !isProd && setHover(false);
                    }}
                    style={eachBtnStyles as any}
                    className={`w-full relative ${
                      buttonShadow === "soft" && "shadow-md"
                    } ${buttonShadow === "solid" && "shadow-xl"} ${
                      buttonShadow === "none" && ""
                    } flex items-center  ${
                      btn.animationType === "pulse"
                        ? "heartbeat"
                        : btn.animationType === "blick"
                        ? "blinker"
                        : btn.animationType === "bounce"
                        ? "bounce-top"
                        : ""
                    } justify-between cursor-pointer flex items-center px-2 text-lg h-[3rem]`}
                    href={btn.file}
                    download
                  >
                    {hover && (
                      <DeleteHover
                        func={() => {
                          handleDelete(btn.id);
                        }}
                      />
                    )}
                    <span className="w-full">Download {btn.name}</span>{" "}
                    <BsFillCloudDownloadFill />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full gap-5" style={buttonStyles}>
            {examplebtn.map((_, i) => (
              <button
                key={i}
                style={eachBtnStyles as any}
                className={`px-2 py-3 ${
                  buttonShadow === "soft" && "shadow-md"
                } ${buttonShadow === "solid" && "shadow-xl"} ${
                  buttonShadow === "none" && ""
                }`}
              >
                {_.name}
              </button>
            ))}
          </div>
        )}
      </div>
      {text && (
        <div
          className="w-full px-2 text-lg"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
      {audio && (
        <div className="w-full px-2 grid-container-sm h-[10rem] bg-gray-200 rounded-md">
          <div className="w-full rounded-md h-full flex items-center justify-center">
            <div className="w-full h-[7rem] rounded-lg">
              <ReactAudioPlayer
                className="w-full h-full rounded-lg"
                src={audio}
              />
            </div>
          </div>
        </div>
      )}
      {video && (
        <div className="w-full px-2 grid-container-sm h-[10rem] rounded-md">
          <div className="w-full rounded-md h-full flex items-center justify-center">
            <ReactPlayer height={"100%"} width={"100%"} url={video} />
          </div>
        </div>
      )}
      <div className="w-full px-2 mt-4 h-full">
        <FooterBlock />
      </div>
    </div>
  );
};

export default PhoneView;
