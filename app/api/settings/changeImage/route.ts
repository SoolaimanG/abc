import { closeConnection, connectDB } from "@/Functions";
import { findUserByUsername } from "@/Functions/func";
import { UserModal } from "@/Models";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { username, profileImage } = await req.json();

  await connectDB();

  const findUser = await findUserByUsername(username);

  //If user doen not exist back-down
  if (!findUser) {
    return new Response(null, {
      status: 404,
      statusText: "User not found",
    });
  }

  try {
    const updatedUser = await UserModal.findOneAndUpdate(
      { username: username },
      {
        image: profileImage,
      }
    );

    if (updatedUser) {
      return NextResponse.json(null, {
        status: 200,
        statusText: "Profile Picture Changed",
      });
    }
  } catch (error) {
    // Handle any errors that occur during the update process
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
