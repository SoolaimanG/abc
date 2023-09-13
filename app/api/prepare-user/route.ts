import { connectDB } from "@/Functions";
import { findUserByEmail } from "@/Functions/func";
import { LinkInBioModel } from "@/Models/linkInBio";
import { LinkModel } from "@/Models/userLinks";
import { regexForEmail } from "@/utils";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  if (!regexForEmail.test(email)) {
    return new Response(null, {
      status: 409,
      statusText: "Invalid email address",
    });
  }

  await connectDB();

  const alreadyExist = await LinkInBioModel.findOne({
    identifier: email.toLowerCase(),
  });
  const alreadyExist2 = await LinkModel.findOne({
    createdBy: email.toLowerCase(),
  });

  const user = await findUserByEmail(email);

  if (!user) {
    return new Response(null, {
      status: 404,
      statusText: "User not found",
    });
  }

  if (alreadyExist && alreadyExist2) {
    return new Response(null, {
      status: 302,
      statusText: "Found",
    });
  }

  try {
    const linkInBio = new LinkInBioModel({
      identifier: email,
      linksInBio: [],
      designNumber: 0,
    });

    const userLinks = new LinkModel({
      linksCreated: [],
      createdBy: email,
    });

    await userLinks.save();
    await linkInBio.save();

    return new Response(null, {
      status: 200,
      statusText: "User Credentials saved",
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Server Error",
    });
  }
};
