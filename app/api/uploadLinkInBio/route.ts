import { closeConnection, connectDB } from "@/Functions";
import { findUserByEmail } from "@/Functions/func";
import { AnalyticsModel } from "@/Models/analytics";
import { LinkInBioModel } from "@/Models/linkInBio";
import { AnalyticsProps } from "@/Types/types";
import { regexForEmail } from "@/utils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const {
    audio,
    secondaryImage,
    video,
    file,
    secondaryTypes,
    fileToUpload,
    profilePicture,
    profilePicBorder,
    profileBio,
    profilePictureShadow,
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
    addBorderToSocialIcon,
    hideBio,
    secondaryBGColor,
    hideName,
    hideSocial,
    haveSecondary,
    firstColor,
    font,
    gap,
    isProd,
    isLinear,
    socialMedia,
    socialMediaIconSize,
    text,
    textColor,
    secondColor,
    referenceToProfilePic,
    referenceToAudioUrl,
    referenceToVideoUrl,
    referenceToFileUrl,
    referenceToSecondaryImage,
    referenceToBackgroundImage,
    currentUserEmail,
    username,
  } = await req.json();

  if (!regexForEmail.test(currentUserEmail)) {
    return new Response(null, {
      status: 400,
      statusText: "Invalid email",
    });
  }

  if (buttonProps.length < 1) {
    return new Response(null, {
      status: 404,
      statusText: "Missing Field (Buttons are required)",
    });
  }

  await connectDB();

  const findUser = await findUserByEmail(currentUserEmail);

  if (!findUser) {
    return new Response(null, {
      status: 404,
      statusText: "User not found",
    });
  }

  if (!findUser.emailVerified) {
    return new Response(null, {
      status: 401,
      statusText: "Email not verified",
    });
  }

  const filter = { username: username };

  const updates = {
    font: font,
    gap: gap,
    backgroundColor: backgroundColor,
    backgroundImage: backgroundImage,
    backgroundType: backgroundType,
    bioCollapse: bioCollapse,
    buttonBackgroundColor: buttonBackgroundColor,
    buttonBorderRadius: buttonBorderRadius,
    buttonColor: buttonColor,
    buttonShadow: buttonShadow,
    buttonProps: buttonProps,
    isLinear: isLinear,
    socialMedia: socialMedia,
    socialMediaIconSize: socialMediaIconSize,
    text: text,
    textColor: textColor,
    secondColor: secondColor,
    buttonType: buttonType,
    addBorderToSocialIcon: addBorderToSocialIcon,
    hideBio: hideBio,
    secondaryBGColor: secondaryBGColor,
    hideName: hideName,
    hideSocial: hideSocial,
    haveSecondary: haveSecondary,
    firstColor: firstColor,
    isProd: isProd,
    audio: audio,
    secondaryImage: secondaryImage,
    video: video,
    file: file,
    secondaryTypes: secondaryTypes,
    fileToUpload: fileToUpload,
    profilePicture: profilePicture,
    profilePicBorder: profilePicBorder,
    profilePictureShadow: profilePictureShadow,
    referenceToProfilePic: referenceToProfilePic,
    referenceToAudioUrl: referenceToAudioUrl,
    referenceToVideoUrl: referenceToVideoUrl,
    referenceToFileUrl: referenceToFileUrl,
    referenceToSecondaryImage: referenceToSecondaryImage,
    referenceToBackgroundImage: referenceToBackgroundImage,
    profileBio: profileBio,
    username: username,
    email: currentUserEmail,
  };

  const newLinkInBio = new LinkInBioModel(updates);

  try {
    const findUser = await LinkInBioModel.findOne({ email: currentUserEmail });

    const mapBtn = buttonProps.map(
      (b: { name: string; views: number; clicks: number }) => {
        return [b.name, b.views, b.clicks];
      }
    );

    if (!findUser) {
      await newLinkInBio.save();

      const new_Analytics = new AnalyticsModel<AnalyticsProps>({
        username: findUser.username,
        views: 0,
        //@ts-ignore
        buttons: mapBtn,
        haveLinkInBio: true,
      });

      await new_Analytics.save();
    } else {
      await LinkInBioModel.updateMany(filter, updates);
    }

    await closeConnection();
    return new Response(null, {
      status: findUser ? 201 : 200,
      statusText: findUser ? "Profile Updated" : "Profile Published",
    });
  } catch (error) {
    console.log(error);
    await closeConnection();
    return new Response(null, {
      status: 500,
      statusText: "Server Error",
    });
  }
};
