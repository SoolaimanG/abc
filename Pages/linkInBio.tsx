"use client";

import Warning from "@/messages/warning";
import React, { useContext, useEffect, useState } from "react";
import { BsFillImageFill, BsPlusSquare, BsStars } from "react-icons/bs";
import Content from "../Components/content";
import Design from "../Components/design";
import ButtonTwo from "@/Components/buttonTwo";
import { FiSave } from "react-icons/fi";
import { MdPhoneAndroid } from "react-icons/md";
import { AiOutlineDesktop } from "react-icons/ai";
import { IconButton, Tooltip } from "@mui/material";
import PhoneView from "@/Components/phoneView";
import { useStore3 } from "@/Providers/zustand";
import { CiWarning } from "react-icons/ci";
import ConfirmPrompt from "@/Components/confirmPrompt";
import { uploadRest } from "@/Functions/uploads";
import { ContextAPI } from "@/Providers/provider";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User } from "@/Types/types";
import axios, { AxiosError } from "axios";
import { generateRandomDesign } from "@/utils/data";
import { regexForUrls } from "@/utils";

const LinkInBio = () => {
  const [active, setActive] = useState(true);
  const [onMobile, setOnMobile] = useState(true);

  //User Properties:--
  const { data } = useSession() as { data: User | null };

  const store = useStore3((state) => state);
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(ContextAPI);
  const [errorMessage, setErrorMessage] = useState<404 | 400 | 500 | 401>(500);

  const [conditions, setConditions] = useState({
    success: false,
    error: false,
    loading: false,
  });
  const [openModal, setOpenModal] = useState(false);

  //Starting Upload with this function
  const startUpload = async () => {
    //Check is any social media did not have link in them
    const isCorrectUrl = store.socialMedia?.find((f) => {
      return regexForUrls.test(f.link as string);
    });

    if (store.buttonProps.length < 1) {
      return dispatch({ type: "warning", payload: "Missing field (Buttons)" });
    }

    const conditionToUse = !store.hideSocial && isCorrectUrl;

    if (!conditionToUse) {
      return dispatch({
        type: "warning",
        payload: "Missing field (Icon Links)",
      });
    }

    if (!data?.emailVerified) {
      return dispatch({ type: "error", payload: "Email is not verified" });
    }

    dispatch({ type: "loading" });
    setConditions({ ...conditions, loading: true });
    setOpen(false);

    const filterFiles = store.buttonProps.filter((f) => {
      return (f.file?.length as number) > 0;
    });

    uploadRest({
      reference: data?.username,
      secondaryImage: store.secondaryImage,
      audio: store.audio,
      video: store.video,
      file: filterFiles[0],
      secondaryTypes: store.secondaryTypes,
      profilePicture: store.profilePicture || data?.image,
      profilePicBorder: store.profilePicBorder,
      profileBio: store.profileBio,
      profilePictureShadow: store.profilePictureShadow,
      bioCollapse: store.bioCollapse,
      buttonBackgroundColor: store.buttonBackgroundColor,
      buttonProps: store.buttonProps,
      backgroundColor: store.backgroundColor,
      backgroundImage:
        store.backgroundType === "image" ? store.backgroundImage : "",
      backgroundType: store.backgroundType,
      buttonBorderRadius: store.buttonBorderRadius,
      buttonColor: store.buttonColor,
      buttonShadow: store.buttonShadow,
      buttonType: store.buttonType,
      enableShareButton: store.enableShareButton,
      firstColor: store.firstColor,
      font: store.font,
      gap: store.gap,
      hideBio: store.hideBio,
      hideSocial: store.hideSocial,
      hideName: store.hideName,
      haveSecondary: store.haveSecondary,
      secondaryBGColor: store.secondaryBGColor,
      secondColor: store.secondaryBGColor,
      socialMedia: store.socialMedia,
      socialMediaIconSize: store.socialMediaIconSize,
      text: store.text,
      textColor: store.textColor,
      isProd: store.isProd,
      email: data?.email,
    })
      .then((ress: any) => {
        setConditions({ ...conditions, loading: false });
        //Depending on either New Profile Saved or Profile is Updated
        if (ress.status == 200) {
          setConditions({ ...conditions, success: true });
          dispatch({ type: "none" });
          //delay modal open cause of react asynchronous nature
          setTimeout(() => {
            setOpenModal(true);
          }, 500);
        } else if (ress.status == 201) {
          dispatch({ type: "success", payload: ress.statusText });
          setConditions({ ...conditions, loading: false });
        }
      })
      .catch((err: AxiosError) => {
        console.log(err);
        setOpenModal(true);
        dispatch({ type: "none" });
        setConditions({ ...conditions, loading: false });
        //@ts-ignore
        setErrorMessage(err?.response?.status!);
        err && setConditions({ ...conditions, error: true });
      });
  };

  function getRandomNumberNotEqualTo(targetNumber: number) {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * generateRandomDesign.length); // You can change 100 to any desired range
    } while (randomNumber === targetNumber);

    return randomNumber;
  }

  //This button is use to generate random designs
  const generateDesign = () => {
    store.clearSocial();
    const length = generateRandomDesign.length as number;
    const randomDesign = Math.floor(Math.random() * length);

    const newRandomNum = getRandomNumberNotEqualTo(randomDesign); //Generate a random num thats not equal to the current random number
    const selectedDesign = generateRandomDesign[newRandomNum];

    //Fill The Design With --->Selected Design
    store.addAudio(selectedDesign.audio);
    store.setToggleBorderSocial(
      selectedDesign.addBorderToSocialIcon as boolean
    );
    //@ts-ignore
    //store.addButton(selectedDesign.buttonProps);
    store.addText(selectedDesign.text);
    store.addProfileBio(selectedDesign.profileBio as string);
    store.addProfilePicture(data?.image as string);
    store.setProfilePicBorder(selectedDesign.profilePicBorder);
    store.setProfilePicShadows(selectedDesign.profilePictureShadow as number);
    store.addVideo(selectedDesign.video);
    //@ts-ignore
    selectedDesign.socialMedia.map((s) => {
      return store.addSocialMedia(s);
    });
    store.setBackgroundImage(selectedDesign.backgroundImage!);
    //@ts-ignore
    store.setBackgroundTypes(selectedDesign.backgroundType);
    //@ts-ignore
    store.setBtnType(selectedDesign.buttonType);
    store.setButtonBackgroundColor(selectedDesign.buttonBackgroundColor);
    store.setButtonRadius(selectedDesign.buttonBorderRadius!);
    //@ts-ignore
    store.setButtonShadow(selectedDesign.buttonShadow);
    store.setButtonColor(selectedDesign.buttonColor!);
    store.setEnableShare(selectedDesign.enableShareButton!);
    store.setFirstColor(selectedDesign.firstColor!);
    store.setToggleBorderSocial(selectedDesign.addBorderToSocialIcon!);
    //@ts-ignore
    store.setFont(selectedDesign.font);
    store.setGap(selectedDesign.gap);
    store.setHideBio(selectedDesign.hideBio);
    store.setHideName(selectedDesign.hideName);
    store.setHideSocial(selectedDesign.hideSocial);
    store.setIsProd(true);
    store.settextColor(selectedDesign.textColor);
    store.setSecondary(selectedDesign.haveSecondary!);
    store.setSecondColor(selectedDesign.secondColor!);
    store.setSecondaryBackgroundImage(selectedDesign.secondaryImage);
    store.setSocialIconSize(selectedDesign.socialMediaIconSize!);
    store.setIsLinear(selectedDesign.isLinear!);
    //@ts-ignore
    store.setSecondaryType(selectedDesign.secondaryTypes);
  };

  //Get User link in bio if created
  useEffect(() => {
    store.clearSocial();
    store.clearButtons();
    const userLinkInBio = async () => {
      axios
        .post("/api/getlinkinbio", {
          username: data?.username,
        })
        .then((res) => {
          const response = res.data;

          //Fill The Design With --->Selected Design

          store.addAudio(response?.audio);
          store.setToggleBorderSocial(
            response?.addBorderToSocialIcon as boolean
          );
          //@ts-ignore
          //store.addButton(selectedDesign.buttonProps);
          store.addText(response?.text);
          store.addProfileBio(response?.profileBio as string);
          store.addProfilePicture(data?.image as string);
          store.setProfilePicBorder(response?.profilePicBorder);
          store.setProfilePicShadows(response?.profilePictureShadow as number);
          store.addVideo(response?.video);
          //@ts-ignore
          response?.socialMedia.map((s) => {
            return store.addSocialMedia(s);
          });
          store.setBackgroundImage(response?.backgroundImage!);
          //@ts-ignore
          store.setBackgroundTypes(response?.backgroundType);
          //@ts-ignore
          store.setBtnType(response?.buttonType);
          store.setButtonBackgroundColor(response?.buttonBackgroundColor);
          store.setButtonRadius(response?.buttonBorderRadius!);
          //@ts-ignore
          store.setButtonShadow(response?.buttonShadow);
          store.setButtonColor(response?.buttonColor!);
          store.setEnableShare(response?.enableShareButton!);
          store.setFirstColor(response?.firstColor!);
          store.setToggleBorderSocial(response?.addBorderToSocialIcon!);
          //@ts-ignore
          store.setFont(response?.font);
          store.setGap(response?.gap);
          store.setHideBio(response?.hideBio);
          store.setHideName(response?.hideName);
          store.setHideSocial(response?.hideSocial);
          store.setIsProd(true);
          store.settextColor(response?.textColor);
          store.setSecondary(response?.haveSecondary!);
          store.setSecondColor(response?.secondColor!);
          store.setSecondaryBackgroundImage(response?.secondaryImage);
          store.setSocialIconSize(response?.socialMediaIconSize!);
          store.setIsLinear(response?.isLinear!);
          //@ts-ignore
          store.setSecondaryType(response?.secondaryTypes);
          store.addButton(response.buttonProps);
          //@ts-ignore
          store.setButtonColor(response.buttonColor as string);
          store.setButtonBackgroundColor(response.buttonBackgroundColor);
          store.setGap(response.gap as number);
          store.addSocialMedia(response.socialMedia);
          store.collapseBio(response.bioCollapse);
          store.setBtnType("solid");
          store.settextColor(response.textColor);
          store.setIsProd(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    data && userLinkInBio();

    return () => {};
  }, [data]);

  return (
    <main>
      {!data?.emailVerified && (
        <Link
          className="cursor-pointer"
          passHref
          href={`/verify-email/${data?.email}`}
        >
          <Warning message="Your email is not verified" />
        </Link>
      )}
      {/* Modals to show current state */}
      <ConfirmPrompt button={<></>} open={openModal} setOpen={setOpenModal}>
        <div className="w-full">
          {conditions.success ? (
            <div className="w-full flex flex-col gap-4">
              <p className="text-2xl text-green-300 text-center">You did it!</p>
              <span className="text-lg text-gray-500">
                🌟 Hooray! The moment youve been waiting for is here! Your
                personalized Link in Bio page is officially PUBLISHED and ready
                to impress 🚀. 📣 Spread the word far and wide, share your
                unique link with pride, and let the world discover what you have
                to offer. Its time to shine like the star you are! Keep
                creating, connecting, and conquering. 🌠 #KonnectLinkInBio
              </span>
              <Link
                href={`/${data?.username}`}
                className={
                  "text-center underline w-full text-lg text-blue-600 text-[0.9rem]"
                }
              >
                Open your newly publish page
              </Link>

              <ButtonTwo
                text="Close"
                disabled={false}
                rounded={false}
                onClick={() => {
                  setOpenModal(false);
                }}
                filled={true}
                hover={true}
              />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-5 items-center justify-center">
              <p className="text-2xl text-red-300 text-center">Oh Snap!</p>
              <span className="text-lg text-gray-500 text-center">
                Something went wrong...
              </span>

              <strong className="text-gray-500 flex flex-col gap-2 text-left text-3xl">
                This could be the issue:{" "}
                <span className="text-red-400 text-center text-lg">
                  {errorMessage === 404
                    ? "You are maybe missing out and important field"
                    : errorMessage === 400
                    ? "Invalid input (you may want to check your inputs again)"
                    : errorMessage === 401
                    ? "Email is not verified"
                    : "Server error"}
                </span>
              </strong>
              <ButtonTwo
                disabled={false}
                hover={false}
                text={"Close"}
                filled={true}
                onClick={() => {
                  setOpenModal(false);
                }}
                rounded={true}
              />
            </div>
          )}
        </div>
      </ConfirmPrompt>
      <div className="w-full overFlow-H flex-col-reverse gap-2 mt-2 flex md:flex-row">
        <div className="md:w-[60%] bg-white rounded-md w-full">
          <nav className="w-full mt-2 flex justify-around">
            <button
              onClick={() => setActive(true)}
              className={`flex pb-2 justify-center w-full ${
                active
                  ? "text-blue-600 border-solid border-b-[2px] border-blue-600 font-semibold"
                  : "border-solid border-b-[2px] border-gray-400"
              } text-lg items-center justify-normal gap-2`}
            >
              <BsPlusSquare />
              Content
            </button>
            <button
              onClick={() => setActive(false)}
              className={`flex pb-2 justify-center w-full ${
                !active
                  ? "text-blue-600 border-solid border-b-[2px] border-blue-600 font-semibold"
                  : "border-solid border-b-[2px] border-gray-400"
              } text-lg items-center justify-normal gap-2`}
            >
              <BsFillImageFill />
              Design
            </button>
          </nav>
          <div>{active ? <Content /> : <Design />}</div>
        </div>
        <div className="md:w-[40%] overFlow-S bottom-20 py-4 w-full bg-gray-200 rounded-md">
          <div className="flex items-end w-full gap-3 px-1 justify-end">
            <div className="w-[7rem]">
              <ConfirmPrompt
                setOpen={setOpen}
                open={open}
                button={
                  <ButtonTwo
                    icon={<FiSave />}
                    disabled={conditions.loading}
                    onClick={() => setOpen(true)}
                    text="Save"
                    hover={false}
                    rounded={true}
                    filled={true}
                  />
                }
              >
                <div className="w-full flex items-center justify-center flex-col gap-4">
                  <div className="p-3 w-fit rounded-md items-center justify-center flex bg-yellow-50">
                    <CiWarning color={"FFFD8C"} size={45} />
                  </div>
                  <p className="text-xl text-center text-gray-500">
                    Please confirm your design before sumbitting
                  </p>

                  <div className="w-full flex items-center gap-3">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full py-3 rounded-lg bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      className="w-full py-3 text-lg text-white rounded-lg bg-blue-600"
                      onClick={startUpload}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </ConfirmPrompt>
            </div>
            <div className="w-[10rem]">
              <ButtonTwo
                icon={<BsStars color="yellow" />}
                text="Generate"
                onClick={generateDesign}
                hover={false}
                rounded={true}
                disabled={false}
                filled={true}
              />
            </div>
          </div>
          {/* Mobile and desktop view */}
          <div className="w-full items-center gap-2 justify-center mt-3 flex">
            <Tooltip title="Phone view">
              <IconButton>
                <MdPhoneAndroid color={onMobile ? "blue" : ""} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Desktop view">
              <IconButton>
                <AiOutlineDesktop color={!onMobile ? "blue" : ""} />
              </IconButton>
            </Tooltip>
          </div>
          {/* Phone Case */}
          <div className="border-solid w-full h-[45rem] rounded-xl border-[8px] border-black">
            {/*  */}
            <PhoneView
              profilePicture={store.profilePicture}
              profileBio={store.profileBio}
              bioCollapse={store.bioCollapse}
              socialMedia={store.socialMedia}
              buttonShadow={store.buttonShadow}
              gap={store.gap}
              buttonProps={store.buttonProps}
              buttonColor={store.buttonColor}
              buttonBorderRadius={store.buttonBorderRadius}
              font={store.font}
              video={store.video}
              text={store.text}
              secondaryBGColor={store.secondaryBGColor}
              profilePicBorder={store.profilePicBorder}
              textColor={store.textColor}
              enableShareButton={store.enableShareButton}
              backgroundColor={store.backgroundColor}
              backgroundImage={store.backgroundImage}
              backgroundType={store.backgroundType}
              buttonType={store.buttonType}
              audio={store.audio}
              addBorderToSocialIcon={store.addBorderToSocialIcon}
              buttonBackgroundColor={store.buttonBackgroundColor}
              haveSecondary={store.haveSecondary}
              profilePictureShadow={store.profilePictureShadow}
              socialMediaIconSize={store.socialMediaIconSize}
              hideName={store.hideName}
              firstColor={store.firstColor}
              secondColor={store.secondColor}
              isLinear={store.isLinear}
              secondaryTypes={store.secondaryTypes}
              secondaryImage={store.secondaryImage}
              hideBio={store.hideBio}
              hideSocial={store.hideSocial}
              isProd={store.isProd}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LinkInBio;
