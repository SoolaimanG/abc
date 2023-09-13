import { closeConnection, connectDB } from "@/Functions";
import { UserModal } from "@/Models";
import { VerifyModal } from "@/Models/verifyAccount";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  //
  const { token } = await req.json();

  await connectDB(); //Open connection to database

  const findEmail = await VerifyModal.findOne({ token: token });

  const compareTime = findEmail?.expires < Date.now();

  if (compareTime) {
    return new Response(null, {
      status: 404,
      statusText: "Token has expired",
    });
  }

  if (!findEmail) {
    return new Response(null, {
      status: 404,
      statusText: "Invalid Token",
    });
  }

  try {
    //Find One Options
    const filter = { email: findEmail?.accountToVerify };
    const update = { emailVerified: true };

    //Update the db
    await UserModal.findOneAndUpdate(filter, update);
    await closeConnection(); //Close the database connection
    return new Response(null, {
      status: 200,
      statusText: "Email Verified",
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: "Something went wrong",
    });
  }
};
