"use client";

import { useStore3 } from "@/Providers/zustand";
import PhoneView from "@/Components/phoneView";
import { useSession } from "next-auth/react";
import { User } from "@/Types/types";

const Page = () => {
  const {
    audio,
    video,
    bioCollapse,
    buttonBackgroundColor,
    buttonProps,
    backgroundColor,
    backgroundImage,
    backgroundType,
    buttonBorderRadius,
    buttonColor,
    buttonShadow,
    buttonType,
    hideBio,
    hideName,
    hideSocial,
    haveSecondary,
    enableShareButton,
    firstColor,
    font,
    gap,
    isLinear,
    isProd,
    profilePicBorder,
    profileBio,
    profilePicture,
    profilePictureShadow,
    secondaryImage,
    secondaryTypes,
    secondColor,
    socialMedia,
    socialMediaIconSize,
    text,
    textColor,
  } = useStore3();

  const { data } = useSession() as { data: User | null };
  return (
    <div className="h-fit w-full flex items-center justify-center">
      <div className="w-full md:w-2/3 h-[45rem] md:m-auto">
        <PhoneView
          audio={audio}
          video={video}
          bioCollapse={bioCollapse}
          buttonBackgroundColor={buttonBackgroundColor}
          buttonProps={buttonProps}
          backgroundColor={backgroundColor}
          backgroundImage={backgroundImage}
          backgroundType={backgroundType}
          buttonBorderRadius={buttonBorderRadius}
          buttonColor={buttonColor}
          buttonShadow={buttonShadow}
          buttonType={buttonType}
          hideBio={hideBio}
          hideName={hideName}
          hideSocial={hideSocial}
          haveSecondary={haveSecondary}
          enableShareButton={enableShareButton}
          firstColor={firstColor}
          font={font}
          gap={gap}
          isLinear={isLinear}
          isProd={true}
          profilePicBorder={profilePicBorder}
          profileBio={profileBio}
          profilePicture={profilePicture ? profilePicture : data?.image}
          profilePictureShadow={profilePictureShadow}
          secondaryImage={secondaryImage}
          secondaryTypes={secondaryTypes}
          secondColor={secondColor}
          socialMedia={socialMedia}
          socialMediaIconSize={socialMediaIconSize}
          text={text}
          textColor={textColor}
        />
      </div>
    </div>
  );
};

export default Page;
