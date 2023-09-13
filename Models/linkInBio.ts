import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LinkInBio = new Schema({
  user: String,
  profileBio: String,
  profilePicBorder: Number,
  buttonProps: Array,
  backgroundColor: String,
  backgroundImage: String,
  background: String,
  bioCollapse: Boolean,
  buttonBackgroundColor: String,
  buttonBorderRadius: Number,
  buttonColor: String,
  buttonShadow: {
    type: String,
    enum: ["solid", "none", "soft"],
  },
  button: String,
  addBorderToSocialIcon: Boolean,
  hideBio: Boolean,
  secondaryBGColor: String,
  enableShareButton: Boolean,
  font: String,
  firstColor: String,
  isLinear: Boolean,
  hideName: Boolean,
  hideSocial: Boolean,
  referenceToProfilePic: String,
  referenceToAudioUrl: String,
  referenceToVideoUrl: String,
  referenceToFileUrl: String,
  referenceToSecondaryImage: String,
  file: String,
  audio: String,
  video: String,
  secondaryImage: String,
  secondaryTypes: String,
  secondColor: String,
  haveSecondary: Boolean,
  socialMedia: Array,
  socialMediaIconSize: Number,
  profilePicture: String,
  gap: Number,
  backgroundType: {
    type: String,
    enum: ["image", "color", "gradient"],
  },
  email: String,
  username: String,
  buttonType: {
    type: String,
    enum: ["solid", "old-fashion", "glassmorphism"],
  },
  textColor: String,
});

export const LinkInBioModel =
  mongoose.models?.linkinbios || mongoose.model("linkinbios", LinkInBio);
