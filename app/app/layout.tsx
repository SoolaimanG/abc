"use client";

import AppNav from "@/Components/appNav";
import SideBar from "@/Components/sideBar";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { User } from "@/Types/types";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false); //Open and close nav on mobile

  const { data } = useSession() as { data: User | null }; //User Session data

  return (
    <main className="w-full relative">
      <div className="w-full flex gap-2">
        <div className={`w-[18%] fixed hidden md:flex md:w-[18%]`}>
          <div
            className={`h-screen sideBar-shadow2 bg-blue-600 transition-all ease-linear delay-[500ms] border-solid border-r-[1.5px] border-gray-400 hidden md:w-full md:flex`}
          >
            <SideBar />
          </div>
        </div>
        {isNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`h-screen bg-blue-500 z-30 text-white fixed transition-all ease-linear delay-[500ms]  flex md:hidden w-[65%]`}
          >
            <SideBar />
          </motion.div>
        )}
        <div
          className={`bg-gray-100 h-fit transition-all ease-linear delay-[500ms] w-full flex`}
        >
          <div
            className={`md:w-[78%] z-30 pl-[20px] cursor-pointer rounded-3xl w-[90%] right-0 md:mr-6 mr-5 md:-ml-[9px] box-shadow m-auto bg-white py-1 md:py-3 margin-6 fixed mt-3 top-0`}
          >
            <AppNav
              username={data?.username as string}
              image={data?.image as string}
              email={data?.email as string}
              toggleNav={setIsNavOpen}
            />
          </div>
          <section className="pt-28 pb-20 md:pb-0 md:pl-[15rem] p-2 w-full">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
