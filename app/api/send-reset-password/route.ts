import { sendEmail } from "@/Actions/index.action";
import { connectDB } from "@/Functions";
import { findUserByEmail, generateToken } from "@/Functions/func";
import { ResetPasswordModal } from "@/Models/resetPassword";
import { regexForEmail, resetPasswordHtml } from "@/utils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  if (!regexForEmail.test(email)) {
    return new Response(null, {
      status: 409,
      statusText: "Invalid email",
    });
  }

  await connectDB();

  const user = await findUserByEmail(email);
  const token = generateToken();

  const fiveHours = 60 * 60 * 5 * 1000;
  const currentTime = Date.now();

  const expires = currentTime + fiveHours;

  if (!user) {
    return new Response(null, {
      status: 404,
      statusText: "User not found",
    });
  }

  const html = resetPasswordHtml(token);

  try {
    const resetPassword = new ResetPasswordModal({
      token: token,
      requestedBy: email,
      expires: expires,
    });

    await resetPassword.save();
    //Send the user email
    await sendEmail({ email: email, html: html, type: "Reset your password" });
    return new Response(null, {
      status: 200,
      statusText: "Reset email sent",
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Server error",
    });
  }
};
