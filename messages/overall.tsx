"use client";

import React, { useContext, useEffect } from "react";
import MessageContainer from "./messageContainer";
import { ContextAPI } from "@/Providers/provider";
import { useAnimation, motion, AnimatePresence } from "framer-motion";

const Overall = () => {
  const { state } = useContext(ContextAPI); //Context API for showing the current toast i need
  const controls = useAnimation();

  //For animating the toast
  const itemsVarient = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  //Animating the slideing and out for the notification toast
  useEffect(() => {
    if (state.messageType !== "none") {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [state.messageType]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ x: 20, opacity: 1 }}
        variants={itemsVarient}
        animate={controls}
        initial="hidden"
      >
        <MessageContainer
          messageType={state.messageType}
          message={state.message}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Overall;
