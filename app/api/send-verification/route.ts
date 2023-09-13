import { sendEmail } from "@/Actions/index.action";
import { closeConnection, connectDB } from "@/Functions";
import { findUserByEmail, generateToken } from "@/Functions/func";
import { VerifyModal } from "@/Models/verifyAccount";
import { regexForEmail, verifyEmailHTML } from "@/utils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  //Is this a vallid email?
  if (!regexForEmail.test(email)) {
    return new Response(null, {
      status: 409,
      statusText: "Invalid email address",
    });
  }

  await connectDB(); //Connect to database

  const userExist = await findUserByEmail(email);

  //Check if we have the user in our database
  if (!userExist) {
    return new Response(null, {
      status: 404,
      statusText: "Email address not found",
    });
  }

  const token = generateToken();

  //Creating expire time (Five Hours)
  const fiveHours = 60 * 60 * 5 * 1000;
  const currentTime = Date.now();

  const expires = currentTime + fiveHours;

  //Messsage to send to the user email
  const html = verifyEmailHTML(token);

  //Handling Error
  try {
    const verify = new VerifyModal({
      accountToVerify: email,
      token: token,
      expires: expires,
    });

    await verify.save();
    await sendEmail({ email: email, html: html, type: "Verify your account" });
    await closeConnection(); //Close the database connection
    return new Response(null, {
      status: 200,
      statusText: "Email Sent successfully",
    });
  } catch (error) {
    await closeConnection(); //Close the database connection
    return new Response(null, {
      status: 500,
      statusText: "Something went wrong",
    });
  }
};
