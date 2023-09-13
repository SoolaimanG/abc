//Different Types from here to avoid recreating user types

export interface User {
  _id: string;
  username: string;
  email: string;
  image?: string;
  emailVerified?: boolean;
  resetPassword?: [
    {
      requestPassword: boolean;
      expires: number;
      lastRequest: number;
      id: string;
    }
  ];
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  firstTimeLogin?: boolean;
}

type UserInfo = {
  username: string;
  email: string;
  image: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  firstTimeLogin: boolean;
};

export type btnProps = {
  id: number;
  type: string;
  url?: string;
  email?: string;
  file?: string;
  name: string;
  animationType: string;
  desc: string;
  views: number;
  clicks: number;
};

export type socialMediaTypes = {
  id: number;
  name: string;
  order: number;
  link?: string;
  color: string;
  icon: string;
  regex: RegExp;
};

export type PropertyAction = {
  addProfilePicture: (props: string) => void;
  setProperties: (properties: PropertyState) => void;
  addSocialMedia: (socialMedia: socialMediaTypes) => void;
  removeSocialMedia: (id: number) => void;
  updateSocialLink?: (props: LinkState) => void;
  updateNameToShow?: (props: { name: string; id: number }) => void;
  addButton: (props: btnProps) => void;
  closeModal: (props: boolean) => void;
  addAudio: (props: string) => void;
  deleteButton: (props: number) => void;
  addVideo: (props: string) => void;
  addText: (props: string) => void;
  removeText: () => void;
  addProfileBio: (props: string) => void;
  collapseBio: (props: boolean) => void;
  setSocialIconSize: (props: number) => void;
  setProfilePicShadows: (props: number) => void;
  setProfilePicBorder: (props: number) => void;
  settextColor: (props: string) => void;
  setPrimaryBackgroundColor: (props: string) => void;
  setSecondary: (props: boolean) => void;
  setButtonShadow: (props: "solid" | "soft" | "none") => void;
  setButtonColor: (props: string) => void;
  setEnableShare: (props: boolean) => void;
  setButtonRadius: (props: number) => void;
  setGap: (props: number) => void;
  setToggleBorderSocial: (props: boolean) => void;
  setButtonBackgroundColor: (props: string) => void;
  setButtonTextColor: (props: string) => void;
  setSecondaryBgColor: (props: string) => void;
  setBackgroundTypes: (props: "image" | "color" | "gradient") => void;
  setHideName: (props: boolean) => void;
  setIsLinear: (props: boolean) => void;
  setFirstColor: (props: string) => void;
  setSecondColor: (props: string) => void;
  setSplitColorOne: (props: string) => void;
  setBackgroundImage: (props: string) => void;
  setSplitColorTwo: (props: string) => void;
  setBtnType: (props: "glassmorphism" | "solid" | "old-fashion") => void;
  setFont: (props: "Ubuntu" | "OpenSans" | "Spectral" | "Libre") => void;
  setSecondaryType: (props: "Color" | "Image") => void;
  setSecondaryBackgroundImage: (props: string) => void;
  setHideBio: (props: boolean) => void;
  setHideSocial: (props: boolean) => void;
  setIsProd: (props: boolean) => void;
  clearSocial: () => void;
  clearButtons: () => void;
};

export type LinkState = {
  link: string;
  id: number;
};

export interface imageProps {
  id: number;
  imageUrl: string;
}

export type PropertyState = {
  socialMedia?: socialMediaTypes[];
  profilePicture?: string;
  profileBio?: string;
  socialMediaIconSize?: number;
  addBorderToSocialIcon?: boolean;
  profilePictureShadow?: number;
  backgroundType?: "image" | "gradient" | "color";
  haveSecondary?: boolean;
  backgroundImage?: string;
  backgroundColor?: string;
  secondaryBGColor?: string;
  buttonShadow?: "solid" | "soft" | "none";
  buttonColor?: string;
  buttonBorderRadius?: number;
  font?: "Ubuntu" | "OpenSans" | "Spectral" | "Libre";
  enableShareButton?: boolean;
  buttonType?: "solid" | "old-fashion" | "glassmorphism";
  buttonProps: btnProps[];
  done?: boolean;
  audio: string;
  video: string;
  text: string;
  bioCollapse: boolean;
  profilePicBorder: number;
  textColor: string;
  gap: number;
  buttonBackgroundColor: string;
  hideName: boolean;
  firstColor?: string;
  secondColor?: string;
  isLinear?: boolean;
  secondaryTypes: "Image" | "Color";
  secondaryImage: string;
  hideBio: boolean;
  hideSocial: boolean;
  isProd?: boolean;
};

export interface AnalyticsProps {
  username: string;
  views: number;
  haveLinkInBio: boolean;
  buttons: [];
}

export interface colorProps {
  name: string;
  code: string;
}

export interface profilePicProps {
  url: string;
  username: string;
}

export interface observersProps {
  loading: boolean;
  error: boolean;
  success: boolean;
  errorType: 500 | 404 | 400;
  setLoading: (loading: boolean) => boolean;
  setError: (error: boolean) => boolean;
  setErrorType: (errorType: 500 | 404 | 400) => 500 | 404 | 400;
  setSuccess: (success: boolean) => boolean;
}
