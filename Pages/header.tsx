"use client";

import Navbar from "@/Components/Navbar";
import Button from "@/Components/button";
import TitleChip from "@/Components/titleChip";
import { useRouter } from "next/navigation";
import { UseBy } from "@/utils/data";
import { motion } from "framer-motion";

const Header = () => {
  //Framer Motion Varients
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible,
  };
  const route = useRouter();

  return (
    <motion.header
      id="home"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 1 } }}
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      className="w-full"
    >
      <Navbar />
      <div className="pt-20 pb-5 md:pb-0 w-full">
        <div className="w-full px-3 flex-col gap-7 md:gap-4 flex items-center justify-center">
          <motion.div variants={itemVariants}>
            <TitleChip
              title="Connect your links with just a click.👈"
              filled={true}
            />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-5xl text-11 font-semibold text-center w-full md:text-8xl"
          >
            All in one{" "}
            <span className="underline text-9 text-blue-600">link</span>{" "}
            management for your business needs
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-500 text-center md:text-3xl"
          >
            On a single platform,you will find all the tools you need to connect
            audience worldwide,manage links,QR Codes, and create brand
            relationship
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button
              bigger={true}
              filled={true}
              name="Get Started"
              onClick={() => {
                route.push("/auth/signup");
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex carosel items-center gap-3"
          >
            {UseBy.map((list) => (
              <div
                className="flex bg-blue-200 px-3 rounded-md py-2 cursor-pointer items-center gap-2 flex-shrink-0"
                key={list.id}
              >
                <span>{list.icon}</span>
                <p className="text-blue-600">{list.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
