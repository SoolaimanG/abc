"use client";

import Button from "@/Components/button";
import ModalComponent from "@/Components/modal";
import PageTitile from "@/Components/pageTitile";
import TitleChip from "@/Components/titleChip";
import { KonnectFeatures } from "@/utils/data";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

//There are two components in this component this is because i want to make sure that each componet has its own state for toggling modal.

type eachFeatureTabProps = {
  message: string;
  title: string;
  id: number;
};

//!First component
const EachFeatureTab = (props: eachFeatureTabProps) => {
  const [open, setOpen] = useState(false);
  const { message, title, id } = props;

  //To Open The Modal Component
  const handleComponentOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <ModalComponent index={id} message={message} open={open} setOpen={setOpen}>
      <div
        onClick={handleComponentOpen}
        className="p-2 h-[7rem] bg-gray-100 cursor-pointer hover:box-shadow border-solid border-[1.5px] border-blue-400 rounded-md"
      >
        <p className="text-lg">
          <span className="text-2xl text-blue-600">{id}</span>. {title}
        </p>
      </div>
    </ModalComponent>
  );
};

//!Second Component [Main]
const Features = () => {
  //Framer Motion
  const itemsVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const control = useAnimation();
  const route = useRouter();
  const { ref: mainRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [control, inView]);

  return (
    <section id="features" className="w-full mt-5 h-fit">
      <motion.div
        animate={control}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        ref={mainRef}
        initial="hidden"
        className="px-3 w-full"
      >
        <motion.div
          variants={itemsVariant}
          className="w-full flex items-center justify-center flex-col gap-2"
        >
          <TitleChip filled={true} title={"Features"} />
          <PageTitile name="What Konnect can do for you!" />
        </motion.div>
        <motion.p
          variants={itemsVariant}
          className="text-center w-full text-lg md:w-2/3 m-auto md:text-xl"
        >
          Discover a world of endless possibilities with{" "}
          <span className="text-blue-600">Konnect.</span> Connect, collaborate,
          and thrive in a vibrant community of professionals. Join us today and
          unlock a new era of networking! 🚀
        </motion.p>
        <motion.div
          animate={control}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          ref={mainRef}
          initial="hidden"
          className="grid-container-sm mt-3"
        >
          {KonnectFeatures.map((feature) => (
            <motion.div variants={itemsVariant} key={feature.id}>
              <EachFeatureTab
                id={feature.id}
                title={feature.title}
                message={feature.more}
              />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={itemsVariant}
          className="mt-5 w-full flex items-center justify-center"
        >
          <Button
            onClick={() => {
              route.push("/auth/signup");
            }}
            bigger={false}
            filled={true}
            name="Click here and Get started"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;
