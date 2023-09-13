"use client";

import Button from "@/Components/button";
import PageTitile from "@/Components/pageTitile";
import TitleChip from "@/Components/titleChip";
import { whyUsReasons } from "@/utils/data";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const WhyUs = () => {
  const active = 1; //*To Make the first element active in the div

  //*Framer Motion Varients
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const [isInView, setIsInView] = useState(false);

  //*Use In View Animation
  const controls = useAnimation();
  const { ref: mainRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  //*Checking if an element is in view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);
  return (
    <motion.section id="whyus" className="w-full md:h-screen h-fit mt-5">
      <div className="px-3 pb-5 md:pb-0">
        <motion.div
          ref={mainRef}
          initial="hidden"
          animate={controls}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          className="w-full flex flex-col items-center justify-center"
        >
          <motion.div variants={itemVariants}>
            <TitleChip filled={true} title="Why Us." />
          </motion.div>
          {/* From Title Chip Component */}
          <motion.div variants={itemVariants}>
            <PageTitile name={"Below are reasons why we are the best"} />
          </motion.div>{" "}
          {/* This is for Section Titles to avoid doing it over and over again */}
        </motion.div>
        {/* Section Content */}
        <div className="w-full mt-10 md:flex-row flex-col flex gap-6 md:gap-3">
          <motion.div
            ref={mainRef}
            initial="hidden"
            animate={controls}
            variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
            className="basis-[50%] flex flex-col gap-2 w-full"
          >
            <motion.p
              variants={itemVariants}
              className="text-5xl text-10 md:text-7xl"
            >
              Why choose us to <span className="text-blue-700">manage</span>{" "}
              your content link?
            </motion.p>
            <motion.small
              variants={itemVariants}
              className="text-2xl text-4 text-gray-500 md:text-3xl"
            >
              Share multiple link into one link and track the performance of
              your project insight.
            </motion.small>
            <motion.div
              //variants={itemVariants}
              className="w-2/3 md:w-1/3 width-6"
            >
              <Button
                name="Learn More"
                filled={true}
                bigger={false}
                onClick={() => {}}
              />
            </motion.div>
          </motion.div>
          <motion.div
            ref={mainRef}
            initial="hidden"
            animate={controls}
            variants={{
              visible: {
                transition: { staggerChildren: 0.5 },
                opacity: 1,
                y: 20,
              },
            }}
            className="basis-[50%] grid-cols-1 md:grid-cols-2 grid flex-wrap gap-3 p-2 w-full border-solid border-gray-400 rounded-lg border-[1.5px]"
          >
            {whyUsReasons.map((reason) => (
              <motion.div
                variants={itemVariants}
                className={`group height-fit ${
                  active === reason.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                } hover:bg-blue-600 hover:text-white cursor-pointer w-full p-2 rounded-md h-[10rem] md:h-[12rem]`}
                key={reason.id}
              >
                <div className="flex items-center justify-between w-full">
                  <p className="text-2xl font-semibold">{reason.name}</p>
                  <span
                    className={`text-3xl ${
                      active === reason.id
                        ? "text-blue-600 bg-white"
                        : "bg-blue-600 text-white"
                    } group-hover:bg-white group-hover:text-blue-600 p-3 bg-blue-600 rounded-full`}
                  >
                    {reason.icon}
                  </span>
                </div>
                <p>{reason.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WhyUs;
