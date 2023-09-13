"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

interface expireProps extends SessionProviderProps {
  expires: string;
}

const AuthProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: expireProps;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
