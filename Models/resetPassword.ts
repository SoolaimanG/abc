import mongoose from "mongoose";

//Types
interface requestResetPassword {
  token: string;
  expires: number;
  requestedBy: string;
}

const Schema = mongoose.Schema;

const resetPassword = new Schema<requestResetPassword>({
  token: {
    type: String,
  },
  requestedBy: {
    type: String,
  },
  expires: {
    type: Number,
  },
});

//A new modal to reset password
export const ResetPasswordModal =
  mongoose.models?.resetpasswords ??
  mongoose.model("resetpasswords", resetPassword);
