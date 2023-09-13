"use client";

import { Links } from "@/utils/data";
import Logo from "./logo";
import { useEffect, useState } from "react";
import Button from "./button";
import { AiOutlineMenu } from "react-icons/ai";
import { Tooltip, IconButton } from "@mui/material";
import { LuPanelRightClose } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [active, setActive] = useState(1); //*Track active state
  const [showNav, setShowNav] = useState(false); //*Track NavBar
  const [onTop, setOnTop] = useState(false); //*To check if the header is on top
  const route = useRouter();

  //*Check if the user scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scroll = window.scrollY;
      setOnTop(scroll > 10 ? true : false);
    });

    //Clean-Up Func
    return () => {
      window.removeEventListener("scroll", () => {
        const scroll = window.scrollY;
        setOnTop(scroll > 10 ? true : false);
      });
    };
  }, []);

  //Framer Motion Varients
  const variants = {
    open: { opacity: 1, x: 0 },
  };

  //*Run this function to change the state of the current section
  const handleSectionChange = (id: number) => {
    setActive(id);
  };

  //Function to show nav
  const showNavFunc = () => {
    setShowNav((prev) => !prev);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
      className={`w-screen ${onTop && "box-shadow"} cursor-pointer fixed z-20`}
    >
      <div className=" w-full px-3 flex items-center justify-between h-[4rem] m-auto bg-white">
        <Logo enableColor={false} loading={false} showIcon={false} />
        {/* Mobile Sidebar */}

        <div className="block relative md:hidden">
          <Tooltip placement={"bottom"} title={"Menu"}>
            <IconButton onClick={showNavFunc}>
              <AiOutlineMenu className="text-[2rem]" />
            </IconButton>
          </Tooltip>
          {showNav && (
            <AnimatePresence>
              <motion.nav
                custom={1000}
                key={showNav + ""}
                animate={
                  showNav
                    ? {
                        clipPath: `circle(${1000 * 2 + 200}px at 40px 40px)`,
                        transition: {
                          type: "spring",
                          stiffness: 20,
                          restDelta: 2,
                        },
                      }
                    : {
                        clipPath: "circle(30px at 40px 40px)",
                        transition: {
                          delay: 0.5,
                          type: "spring",
                          stiffness: 400,
                          damping: 40,
                        },
                      }
                }
                variants={variants}
                className="absolute pb-5 width-9 rounded-md bg-blue-100 p-2 w-[22rem] z-10 right-0 top-0"
              >
                <div className="w-full flex items-center justify-between">
                  <Logo enableColor={true} loading={false} showIcon={false} />
                  <Tooltip placement={"bottom"} title="Close Menu">
                    <IconButton onClick={showNavFunc}>
                      <LuPanelRightClose className="text-[2rem]" />
                    </IconButton>
                  </Tooltip>
                </div>
                <div className="mt-3 flex flex-col gap-7">
                  {Links.map((link) => (
                    <div key={link.id} className="relative">
                      <a
                        onClick={() => handleSectionChange(link.id)}
                        href={link.path}
                        className={`py-2 text-blue-600 hoverLink ${
                          active === link.id && "hoverActive"
                        } text-xl`}
                        key={link.id}
                      >
                        {link.name}
                      </a>
                    </div>
                  ))}
                  <div className="flex flex-col gap-7">
                    <div className="relative">
                      <Link
                        href={"/auth/login"}
                        className="py-2 text-xl text-blue-600 hoverLink"
                        passHref
                      >
                        Login
                      </Link>
                    </div>
                    <div className="relative">
                      <Link
                        href={"/auth/signup"}
                        className="py-2 text-xl text-blue-600 hoverLink"
                        passHref
                      >
                        SignUp
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.nav>
            </AnimatePresence>
          )}
        </div>
        {/* Links From Utils */}
        <div className="hidden md:flex items-center gap-3">
          {Links.map((link) => (
            <a
              onClick={() => handleSectionChange(link.id)}
              className={`px-4 hover:text-blue-300 py-2 ${
                active === link.id && "bg-blue-200 text-blue-600"
              } rounded-md`}
              href={link.path}
              key={link.id}
            >
              {link.name}
            </a>
          ))}
        </div>
        {/* Authentication Page Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            bigger={false}
            name="Login"
            filled={false}
            onClick={() => {
              route.push("/auth/login");
            }}
          />
          <Button
            bigger={false}
            name="SignUp"
            onClick={() => {
              route.push("/auth/signup");
            }}
            filled={true}
          />
        </div>
      </div>
      <hr className="bg-blue-600" />
    </motion.nav>
  );
};

export default Navbar;
