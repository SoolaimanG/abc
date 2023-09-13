import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { closeConnection, connectDB } from "@/Functions";
import bcrypt from "bcrypt";
import {
  findUserByEmail,
  findUserByUsernameAndPassword,
  generateToken,
} from "@/Functions/func";
import { UserModal } from "@/Models";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credential) {
        await connectDB();
        const user = await findUserByUsernameAndPassword(
          credential?.username as string
        );

        if (!user) {
          return new Response(null, {
            status: 404,
            statusText: "User does not exist",
          });
        }

        const comparingPassword = await bcrypt.compare(
          credential?.password as string,
          user?.password
        );

        if (!comparingPassword) {
          return new Response(null, {
            status: 400,
            statusText: "Invalid password",
          });
        }

        return user;
      },
    }),
  ],
  debug: true,
  callbacks: {
    async session({ session }) {
      await connectDB();
      const sessionUser = await findUserByEmail(session?.user?.email as string);

      return sessionUser;
    },
    async signIn({ user, account }) {
      try {
        await connectDB();
        const token = generateToken();

        const username = user?.email?.split("@")[0];

        const findUser = await findUserByEmail(user?.email as string);

        if (account?.type === "oauth") {
          if (!findUser) {
            const newUser = new UserModal({
              email: user?.email?.toLowerCase(),
              username: username,
              password: token,
              verifyAccountToken: token,
              image: user?.image || "",
              emailVerified: true,
              firstTimeLogin: true,
            });

            await newUser.save();
            await closeConnection();
            return true;
          }
        } else {
          if (!findUser) {
            return false;
          }
        }
      } catch (error) {
        console.error(error);
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 5,
  },
  pages: {
    signIn: "/auth/login",
    verifyRequest: "/auth/verify-email",
    signOut: "/app/logout",
  },
};
