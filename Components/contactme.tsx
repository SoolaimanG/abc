"use client";

import { useEffect, useState } from "react";
import { BiSupport, BiSolidMessageSquareDots } from "react-icons/bi";
import { AiFillPhone, AiOutlineClose } from "react-icons/ai";
import { motion, useAnimation } from "framer-motion";
const Contactme = () => {
  const [open, setOpen] = useState(false);
  const controls = useAnimation();

  //Open Tip
  const handleClose = () => {
    setOpen(false);
  };

  //Close Tip
  const handleOpen = () => {
    setOpen(true);
  };

  //Framer Motion Varient
  const itemsVarient = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Update the controls object when open state changes
  useEffect(() => {
    controls.start(open ? "visible" : "hidden");
  }, [open, controls]);

  return (
    <div className="fixed right-0 mr-5 mb-5 bottom-0">
      <motion.div
        initial="hidden"
        variants={{ visible: { transition: { staggerChildren: 0.35 } } }}
        animate={controls}
        className="flex gap-2 items-center flex-col"
      >
        <motion.a
          variants={itemsVarient}
          href="https://wa.me/+2347068214943"
          target={"_blank"}
          className="w-[3rem] h-[3rem] cursor-pointer rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl"
        >
          <BiSolidMessageSquareDots />
        </motion.a>
        <motion.a
          href="tel:+2348061450508"
          variants={itemsVarient}
          className="w-[3.5rem] h-[3.5rem] cursor-pointer rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl"
        >
          <AiFillPhone />
        </motion.a>
        {open ? (
          <motion.div
            onClick={handleClose}
            className={`w-[4rem] h-[4rem] cursor-pointer rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl`}
          >
            <AiOutlineClose />
          </motion.div>
        ) : (
          <motion.div
            onClick={handleOpen}
            className={`w-[4rem] h-[4rem] cursor-pointer rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl`}
          >
            <BiSupport />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Contactme;
