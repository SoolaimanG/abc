import { closeConnection, connectDB } from "@/Functions";
import { LinkInBioModel } from "@/Models/linkInBio";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { username } = await req.json();

  await connectDB();

  try {
    const findLinkInBio = await LinkInBioModel.findOne({
      username,
    });

    closeConnection();

    if (!findLinkInBio) {
      return new Response(null, {
        status: 404,
        statusText: "Not Found",
      });
    }

    return NextResponse.json(findLinkInBio);
  } catch (error) {
    console.log(error);
  }
};
