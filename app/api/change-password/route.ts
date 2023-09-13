import { closeConnection, connectDB } from "@/Functions";
import { findByToken } from "@/Functions/func";
import { UserModal } from "@/Models";
import { regexForPassword, resetSuccessful } from "@/utils";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/Actions/index.action";
import { ResetPasswordModal } from "@/Models/resetPassword";

export const POST = async (req: NextRequest) => {
  const { token, password, confirmPassword } = await req.json();

  if (password !== confirmPassword) {
    return new Response(null, {
      status: 401,
      statusText: "Error from password verification",
    });
  }

  if (!regexForPassword.test(password)) {
    return new Response(null, {
      status: 401,
      statusText: "Use a strong password",
    });
  }

  await connectDB();

  const request = await ResetPasswordModal.findOne({ token: token });

  if (!request) {
    return new Response(null, {
      status: 404,
      statusText: "Invalid token",
    });
  }

  const checkTime = request?.expires < Date.now();

  //In the case the token expires
  if (checkTime) {
    return new Response(null, {
      status: 409,
      statusText: "Token has expired",
    });
  }
  try {
    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt); //Hashing the password for security purposes

    const html = resetSuccessful();

    const filter = { email: request?.requestedBy };
    const update = { password: hashPassword };

    await UserModal.findOneAndUpdate(filter, update);
    await sendEmail({
      email: request?.requestedBy,
      html: html,
      type: "Password reset successfull",
    });
    await closeConnection();
    return new Response(null, {
      status: 200,
      statusText: "Password updated successfully",
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Error updating password",
    });
  }
};
