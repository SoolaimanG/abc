import { closeConnection, connectDB } from "@/Functions";
import { findUserByEmail, generateToken } from "@/Functions/func";
import { VerifyModal } from "@/Models/verifyAccount";
import { regexForEmail } from "@/utils";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { token: string } }
) => {
  await connectDB(); //Open connection

  const findToken = await VerifyModal.findOne({ token: params.token });

  await closeConnection(); //Close connection

  try {
    if (findToken) {
      return new Response(null, {
        status: 201,
        statusText: findToken?.accountToVerify,
      });
    } else {
      return new Response(null, {
        status: 404,
        statusText: "Not Found",
      });
    }
  } catch (error: any) {
    console.log(error);
    return new Response(null, {
      status: 201,
      statusText: error?.message,
    });
  }
};
