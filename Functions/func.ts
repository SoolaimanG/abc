import { UserModal } from "@/Models";
import { ResetPasswordModal } from "@/Models/resetPassword";
import { v4 as uuidv4 } from "uuid";

//!Using this micro function for checks and lookups
export const findUserByEmail = async (email: string) => {
  const user = await UserModal.findOne({ email: email });
  return user;
};

export const findUserByUsername = async (username: string) => {
  const user = await UserModal.findOne({ username: username });
  return user;
};

export const findUserByUsernameAndPassword = async (username: string) => {
  const user = await UserModal.findOne({ username: username }).select(
    "+password"
  );
  return user;
};

export const findUserByEmailAndPassword = async (email: string) => {
  const user = await UserModal.findOne({ email: email }).select("+password");
  return user;
};

export const generateToken = () => {
  const token = uuidv4();
  return token;
};

export const findByToken = async (token: string) => {
  console.log(token);
  const request = await ResetPasswordModal.findOne({ token: token });
  console.log(request);
  return request;
};
