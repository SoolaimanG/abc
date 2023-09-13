import mongoose from "mongoose";

interface verifyAccountOptions {
  accountToVerify: string;
  token: string;
  expires: number;
}

const Schema = mongoose.Schema;

const verifyAccount = new Schema<verifyAccountOptions>({
  accountToVerify: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  expires: {
    type: Number,
  },
});

export const VerifyModal =
  mongoose.models?.verifyaccounts ??
  mongoose.model("verifyaccounts", verifyAccount);
