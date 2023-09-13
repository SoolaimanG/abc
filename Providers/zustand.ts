import {
  LinkState,
  PropertyAction,
  PropertyState,
  btnProps,
  socialMediaTypes,
} from "@/Types/types";
import { create } from "zustand";

const images = [
  "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1560015534-cee980ba7e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1584384689201-e0bcbe2c7f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1485841938031-1bf81239b815?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU4fHxiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
];

export const useStore3 = create<PropertyState & PropertyAction>((set) => ({
  socialMedia: [], // Initial state for socialMedia array
  profilePicture: "",
  profileBio: "",
  profilePictureShadow: 7,
  socialMediaIconSize: 21,
  backgroundType: "color",
  backgroundColor: "#ffff",
  backgroundImage: images[Math.floor(Math.random() * images.length)],
  buttonShadow: "solid",
  font: "Spectral",
  enableShareButton: true,
  buttonBorderRadius: 15,
  buttonColor: "#FFFFFF",
  secondaryBGColor: "#eeee",
  buttonAlign: "center",
  buttonProps: [],
  done: false,
  audio: "",
  video: "",
  text: "",
  bioCollapse: false,
  profilePicBorder: 20,
  textColor: "#252525",
  gap: 70,
  addBorderToSocialIcon: false,
  buttonBackgroundColor: "#4DBBFF",
  hideName: false,
  isLinear: true,
  firstColor: "#ff0000",
  secondColor: "#0f4c81",
  images: [],
  buttonType: "solid",
  secondaryTypes: "Color",
  secondaryImage: "",
  hideBio: false,
  hideSocial: false,
  isProd: false,

  setProperties: (state) => set({ ...state }), // Action to update properties
  removeSocialMedia: (id: number) => {
    set((state) => ({
      socialMedia: (state.socialMedia as any).filter(
        (item: any) => item.id !== id
      ),
    }));
  },
  //Setting the actions directly from my providers...
  addSocialMedia: (socialMedia: socialMediaTypes) => {
    set((state) => ({
      ...state,
      socialMedia: [...(state.socialMedia as any), socialMedia],
    }));
  },
  updateSocialLink(props: LinkState) {
    const { id, link } = props;
    set((state) => ({
      ...state,
      socialMedia: state.socialMedia?.map((c) =>
        c.id === id ? { ...c, link: link } : { ...c }
      ),
    }));
  },
  updateNameToShow(props: { name: string; id: number }) {
    const { name, id } = props;
    set((state) => ({
      ...state,
      socialMedia: state.socialMedia?.map((c) =>
        c.id === id ? { ...c, nameToShow: name } : { ...c }
      ),
    }));
  },
  addButton(props: btnProps) {
    set((state) => ({
      ...state,
      buttonProps: [...state.buttonProps, props],
    }));
  },
  deleteButton(props: number) {
    set((state) => ({
      ...state,
      buttonProps: state.buttonProps.filter((p) => {
        return p.id !== props;
      }),
    }));
  },
  closeModal(props: boolean) {
    set((state) => ({
      ...state,
      done: props,
    }));
  },
  addAudio(props) {
    set((state) => ({
      ...state,
      audio: props,
    }));
  },
  addVideo(props) {
    set((state) => ({
      ...state,
      video: props,
    }));
  },
  addText(props: string) {
    set((state) => ({
      ...state,
      text: props,
    }));
  },
  removeText() {
    set((state) => ({
      ...state,
      text: "",
    }));
  },
  addProfilePicture(props: string) {
    set((state) => ({
      ...state,
      profilePicture: props,
    }));
  },
  addProfileBio(props: string) {
    set((state) => ({
      ...state,
      profileBio: props,
    }));
  },
  collapseBio(props: boolean) {
    set((state) => ({
      ...state,
      bioCollapse: props,
    }));
  },
  setSocialIconSize(props: number) {
    set((state) => ({
      ...state,
      socialMediaIconSize: props,
    }));
  },
  setProfilePicShadows(props: number) {
    set((state) => ({
      ...state,
      profilePictureShadow: props,
    }));
  },
  setProfilePicBorder(props: number) {
    set((state) => ({
      ...state,
      profilePicBorder: props,
    }));
  },
  settextColor(props: string) {
    set((state) => ({
      ...state,
      textColor: props,
    }));
  },
  setPrimaryBackgroundColor(props: string) {
    set((state) => ({
      ...state,
      backgroundColor: props,
    }));
  },
  setSecondary(props: boolean) {
    set((state) => ({
      ...state,
      haveSecondary: props,
    }));
  },
  setButtonShadow(props: "solid" | "none" | "soft") {
    set((state) => ({
      ...state,
      buttonShadow: props,
    }));
  },
  setButtonColor(props: string) {
    set((state) => ({
      ...state,
      buttonColor: props,
    }));
  },
  setButtonRadius(props: number) {
    set((state) => ({
      ...state,
      buttonBorderRadius: props,
    }));
  },
  setEnableShare(props: boolean) {
    set((state) => ({
      ...state,
      enableShareButton: props,
    }));
  },
  setEnableQrCode(props: boolean) {
    set((state) => ({
      ...state,
      enableQrCode: props,
    }));
  },
  setEnableSearch(props: boolean) {
    set((state) => ({
      ...state,
      enableSearchButton: props,
    }));
  },
  setGap(props: number) {
    set((state) => ({
      ...state,
      gap: props,
    }));
  },
  setToggleBorderSocial: (props: boolean) => {
    set((state) => ({
      ...state,
      addBorderToSocialIcon: props,
    }));
  },
  setButtonTextColor: (props: string) => {
    set((state) => ({
      ...state,
      buttonColor: props,
    }));
  },
  setButtonBackgroundColor: (props: string) => {
    set((state) => ({
      ...state,
      buttonBackgroundColor: props,
    }));
  },
  setSecondaryBgColor: (props: string) => {
    set((state) => ({
      ...state,
      secondaryBGColor: props,
    }));
  },
  setBackgroundTypes: (props: "image" | "color" | "gradient") => {
    set((state) => ({
      ...state,
      backgroundType: props,
    }));
  },
  setHideName(props) {
    set((state) => ({
      ...state,
      hideName: props,
    }));
  },
  setIsLinear(props: boolean) {
    set((state) => ({
      ...state,
      isLinear: props,
    }));
  },
  setFirstColor(props: string) {
    set((state) => ({
      ...state,
      firstColor: props,
    }));
  },
  setSecondColor(props: string) {
    set((state) => ({
      ...state,
      secondColor: props,
    }));
  },
  setSplitColorOne(props: string) {
    set((state) => ({
      ...state,
      splitColorOne: props,
    }));
  },
  setSplitColorTwo(props: string) {
    set((state) => ({
      ...state,
      splitColorTwo: props,
    }));
  },
  setBackgroundImage(props: string) {
    set((state) => ({
      ...state,
      backgroundImage: props,
    }));
  },
  setBtnType(props) {
    set((state) => ({
      ...state,
      buttonType: props,
    }));
  },
  setFont(props) {
    set((state) => ({
      ...state,
      font: props,
    }));
  },
  setSecondaryType(props) {
    set((state) => ({
      ...state,
      secondaryTypes: props,
    }));
  },
  setSecondaryBackgroundImage(props) {
    set((state) => ({
      ...state,
      secondaryImage: props,
    }));
  },
  setHideBio(props) {
    set((state) => ({
      ...state,
      hideBio: props,
    }));
  },
  setHideSocial(props) {
    set((state) => ({
      ...state,
      hideSocial: props,
    }));
  },
  setIsProd(props) {
    set((state) => ({
      ...state,
      isProd: props,
    }));
  },
  clearSocial() {
    set((state) => ({
      ...state,
      socialMedia: [],
    }));
  },
  clearButtons: () => {
    set((state) => ({
      ...state,
      buttonProps: [],
    }));
  },
}));
