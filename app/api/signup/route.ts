import {
  closeConnection,
  connectDB,
  generateRandomProfileImage,
} from "@/Functions";
import { UserModal } from "@/Models";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { regexForEmail, regexForPassword, regexForUsername } from "@/utils";
import { findUserByEmail, findUserByUsername } from "@/Functions/func";

export const POST = async (req: NextRequest) => {
  const { username, email, password } = await req.json();

  //_Test for password
  if (!regexForEmail.test(email)) {
    return new Response(null, {
      status: 409,
      statusText: "Use a valid email address",
    });
  }
  //_Test for username
  if (username.length < 5 || regexForUsername.test(username)) {
    return new Response(null, {
      status: 409,
      statusText: "Username too short or contains invalid characters",
    });
  }
  //_Test for password
  if (!regexForPassword.test(password)) {
    return new Response(null, {
      status: 409,
      statusText: "Use a strong password",
    });
  }

  await connectDB();

  //Check if we have the username and email
  const checkEmail = await findUserByEmail(email);
  const checkUsername = await findUserByUsername(username);
  const imageUrl = await generateRandomProfileImage();

  if (checkEmail) {
    return new Response(null, {
      status: 409,
      statusText: "Account with this email already exists",
    });
  }

  if (checkUsername) {
    return new Response(null, {
      status: 409,
      statusText: "Seems you have an account already",
    });
  }

  const salt = 10; //salt for bcrypt
  //Hash password
  const hashedPassword = await bcrypt.hash(password, salt);
  const token = uuidv4();

  try {
    const userAcct = new UserModal({
      email: email,
      username: username,
      password: hashedPassword,
      firstTimeLogin: true,
      emailVerified: false,
      image: imageUrl,
      verifyAccountToken: token,
    });

    await userAcct.save(); // Save the user to the database

    await closeConnection(); // Close the connection
    return new Response(null, {
      status: 200,
      statusText: "Account Created",
    });
  } catch (error) {
    console.log(error);
    await closeConnection(); //Close the DB connection
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
