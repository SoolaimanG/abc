import { connectDB } from "@/Functions";
import { findUserByUsername } from "@/Functions/func";
import { AnalyticsModel } from "@/Models/analytics";
import { LinkInBioModel } from "@/Models/linkInBio";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();

  const params = { username: "soolaimang" };

  const findUser = await findUserByUsername(params.username);

  if (!findUser) {
    return new Response(null, {
      status: 404,
      statusText: "User not found",
    });
  }

  try {
    const userLinkInBio = await LinkInBioModel.findOne({
      email: findUser.email,
    });

    const findAnalytics = await AnalyticsModel.findOne({
      username: findUser.username,
    });

    if (!userLinkInBio) {
      return new Response(null, {
        status: 404,
        statusText: "Link in bio not found",
      });
    }

    if (findAnalytics) {
      await AnalyticsModel.updateOne({ views: findAnalytics.views + 1 });
    }

    return NextResponse.json({ data: userLinkInBio, status: 200 });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
