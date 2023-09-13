import { profilePicProps } from "@/Types/types";
import { storage1 } from "@/utils/init";
import axios, { AxiosResponse, AxiosStatic } from "axios";
import {
  StorageReference,
  UploadResult,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";

export const uploadRest = async (props: any) => {
  const {
    reference,
    audio,
    secondaryImage,
    video,
    file,
    secondaryTypes,
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
    isLinear,
    socialMedia,
    socialMediaIconSize,
    text,
    textColor,
    secondColor,
    email,
  } = props;

  const profilePicRef: UploadResult | null =
    profilePicture && !profilePicture.startsWith("https")
      ? await uploadString(
          ref(storage1, `konnectFileStorage_${reference}_ProfilePic`),
          profilePicture as string,
          "data_url"
        )
      : null;
  const profileUrl =
    profilePicRef &&
    (await getDownloadURL(profilePicRef?.ref as StorageReference));

  const secondaryImageRef: UploadResult | null =
    secondaryImage && !secondaryImage.startsWith("https")
      ? await uploadString(
          ref(storage1, `konnectFileStorage_${reference}_SecondaryImage`),
          secondaryImage as string,
          "data_url"
        )
      : null;
  const secondaryImageUrl =
    secondaryImageRef &&
    (await getDownloadURL(secondaryImageRef?.ref as StorageReference));
  //
  const audioRef: UploadResult | null = audio
    ? await uploadString(
        ref(storage1, `konnectFileStorage_${reference}_Audio`),
        audio as string,
        "data_url"
      )
    : null;
  const audioUrl =
    audioRef && (await getDownloadURL(audioRef?.ref as StorageReference));
  //
  const videoRef: UploadResult | null = video
    ? await uploadString(
        ref(storage1, `konnectFileStorage_${reference}_Video`),
        video as string,
        "data_url"
      )
    : null;
  const videoUrl =
    videoRef && (await getDownloadURL(videoRef?.ref as StorageReference));
  //
  const backgroundRef: UploadResult | null =
    backgroundImage && !backgroundImage.startsWith("http")
      ? await uploadString(
          ref(storage1, `konnectFileStorage_${reference}_BackgroundImage`),
          backgroundImage as string,
          "data_url"
        )
      : null;
  const backgroundUrl =
    backgroundImage &&
    (await getDownloadURL(backgroundRef?.ref as StorageReference));
  //

  console.log(file);
  const fileRef: UploadResult | null = file
    ? await uploadString(
        ref(storage1, `konnectFileStorage_${reference}_File`),
        file?.file as string,
        "data_url"
      )
    : null;
  const fileUrl =
    fileRef && (await getDownloadURL(fileRef?.ref as StorageReference));

  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosStatic = await axios.post("/api/uploadLinkInBio", {
        profilePicture: profilePicture.startsWith("http")
          ? profilePicture
          : profileUrl,
        profileBio: profileBio,
        profilePicBorder: profilePicBorder,
        profilePictureShadow: profilePictureShadow,
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage.startsWith("http")
          ? backgroundImage
          : backgroundUrl,
        backgroundType: backgroundType,
        bioCollapse: bioCollapse,
        buttonBackgroundColor: buttonBackgroundColor,
        buttonBorderRadius: buttonBorderRadius,
        buttonColor: buttonColor,
        buttonProps: buttonProps,
        buttonShadow: buttonShadow,
        buttonType: buttonType,
        gap: gap,
        haveSecondary: haveSecondary,
        hideBio: hideBio,
        hideName: hideName,
        hideSocial: hideSocial,
        addBorderToSocialIcon: addBorderToSocialIcon,
        secondaryBGColor: secondaryBGColor,
        secondaryImage: secondaryImage.startsWith("http")
          ? secondaryImage
          : secondaryImageUrl,
        secondaryTypes: secondaryTypes,
        firstColor: firstColor,
        isProd: true,
        isLinear: isLinear,
        socialMedia: socialMedia,
        socialMediaIconSize: socialMediaIconSize,
        text: text,
        textColor: textColor,
        secondColor: secondColor,
        font: font,
        audio: audioUrl || "",
        file: fileUrl || "",
        video: videoUrl || "",
        referenceToProfilePic: profileUrl
          ? `konnectFileStorage_${reference}_ProfilePic`
          : "",
        referenceToAudioUrl: audioUrl
          ? `konnectFileStorage_${reference}_Audio`
          : "",
        referenceToVideoUrl: videoUrl
          ? `konnectFileStorage_${reference}_Video`
          : "",
        referenceToFileUrl: fileUrl
          ? `konnectFileStorage_${reference}_File`
          : "",
        referenceToSecondaryImage: secondaryImageUrl
          ? `konnectFileStorage_${reference}_SecondaryImage`
          : "",
        referenceToBackgroundImage: backgroundUrl
          ? `konnectFileStorage_${reference}_BackgroundImage`
          : "",
        username: reference,
        currentUserEmail: email,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const UploadProfileImage = async (props: profilePicProps) => {
  const { url, username } = props;

  //console.log(url, username);

  let profileUrl = "";

  if (!url.startsWith("https:")) {
    const returnRef = await uploadString(
      ref(storage1, `konnectFileStorage_${username}_app_profilePicture`),
      url as string,
      "data_url"
    );

    const downLoadableUrl = await getDownloadURL(
      returnRef.ref as StorageReference
    );

    profileUrl = downLoadableUrl;
  }

  return new Promise<PromiseConstructor | AxiosResponse>(
    async (resolve, reject) => {
      try {
        const response = await axios.post("/api/settings/changeImage", {
          profileImage: url.startsWith("https") ? url : profileUrl,
          username: username,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }
  );
};
