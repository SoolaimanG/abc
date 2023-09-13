import { closeConnection, connectDB } from "@/Functions";
import { findUserByEmail } from "@/Functions/func";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { email: string } }
) => {
  await connectDB();

  const findUser = await findUserByEmail(params.email);

  await closeConnection();
  if (!findUser) {
    return new Response(null, {
      status: 404,
      statusText: "User not found",
    });
  }

  return new Response(null, {
    status: 200,
    statusText: JSON.stringify(findUser),
  });
};
