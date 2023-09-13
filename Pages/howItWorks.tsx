"use client";

import PageTitile from "@/Components/pageTitile";
import TitleChip from "@/Components/titleChip";
import { HowItWorksArray } from "@/utils/data";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const HowItWorks = () => {
  const controls = useAnimation(); //From Framer
  const { ref: mainRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  //Framer Motion Animation (Straight Forword)
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  //Track the scroll
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);
  return (
    <motion.section id="howitworks" className="w-full h-auto md:h-screen mt-5">
      <div className="w-full px-3">
        <motion.div
          animate={controls}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          ref={mainRef}
          className="w-full flex-col flex items-center justify-center"
        >
          <motion.div variants={itemVariants}>
            <TitleChip title="How it works." filled={true} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PageTitile name="Three easy steps to get started" />
          </motion.div>
        </motion.div>
        <motion.div
          ref={mainRef}
          initial="hidden"
          animate={controls}
          variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
          className="w-full mt-4 flex md:flex-row flex-col items-center gap-4"
        >
          {HowItWorksArray.map((work) => (
            <motion.div
              variants={itemVariants}
              className="w-full flex cursor-pointer height-fit flex-col gap-2 p-2 rounded-md bg-blue-200 h-[20rem]"
              key={work.id}
            >
              <span className="text-3xl w-fit p-2 rounded-full bg-blue-500 text-white">
                {work.icon}
              </span>
              <h2 className="text-4xl font-semibold">{work.name}</h2>
              <p className="text-xl">{work.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;
