import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Authentication",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default Layout;
