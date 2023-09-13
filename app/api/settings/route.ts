import { findUserByUsernameAndPassword } from "@/Functions/func";
import { UserModal } from "@/Models";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { newPassword, oldPassword, username } = await req.json();

  const findUser = await findUserByUsernameAndPassword(username);

  //If user doen not exist back-down
  if (!findUser) {
    return new Response(null, {
      status: 404,
      statusText: "User not found",
    });
  }

  const comparePassword = await bcrypt.compare(oldPassword, findUser.password);

  if (!comparePassword) {
    return new Response(null, {
      status: 409,
      statusText: "Password not matching",
    });
  }

  const SALT = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, SALT);

  //Update Password and Avatar

  const filter = { username: username };
  const updateOption = {
    password: hashPassword,
  };

  try {
    await UserModal.updateMany(filter, updateOption).then(() => {
      return NextResponse.json({ status: 200, message: "Profile Updated" });
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
