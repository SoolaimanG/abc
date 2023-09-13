"use client";

import Button from "@/Components/button";
import Illustration from "@/Components/illustration";
import Logo from "@/Components/logo";
import PageTitile from "@/Components/pageTitile";
import TitleChip from "@/Components/titleChip";
import { TestLinks } from "@/utils/data";
import { useContext, useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { handleCopying, regexForUrls } from "@/utils";
import axios from "axios";
import { ContextAPI } from "@/Providers/provider";

//A Component For Created Links
const createdLinks = (option: string, id: number) => {
  return (
    <div className="w-full py-2 items-center rounded-lg bg-blue-400 p-1 flex">
      <p className="w-full text-white text-left">{option}</p>
    </div>
  );
};

const ShortenLink = () => {
  const [openOptions, setOpenOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postResponse, setPostResponse] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);
  const { dispatch } = useContext(ContextAPI);
  const [storeLink, setStoreLink] = useState<string[]>([]);

  const control = useAnimation(); //From Framer
  const { ref: mainRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  //Framer Motion Animation (Straight Forword)
  const itemsVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  //To See Links user have created
  const handleOptionOpen = () => {
    setOpenOptions((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmit = async () => {
    //!_First Sanitize the input
    setLoading(true);
    const testURL = regexForUrls.test(link);

    //If the input is not valid return a notifify message
    if (!link && !testURL) {
      dispatch({ type: "warning", payload: "Enter a valid url" });
      setLoading(false);
      return;
    }

    //Handling Error response
    try {
      axios
        .post("https://konnect-api-soolaimang.onrender.com/shorten-link", {
          link: link,
        })
        .then((res) => {
          setPostResponse(res.data);
          setStoreLink((prev) => [...prev, postResponse]); //Saving the post to Session Storage.
          dispatch({ type: "success", payload: "Link generated" });
          setLoading(false);
          setLink("");
        })
        .catch(() => {
          setLoading(false);
          setLink("");
        });
    } catch (error) {
      dispatch({ type: "error", payload: "Something went wrong" });
      setLoading(false);
    }
  };

  //Change Copy UI Back to the old form after copy
  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  //Track the scroll
  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [inView, control]);

  return (
    <section
      id="shortenlink"
      className="w-full pb-0 md:pb-5 mt-5 md:mt-0 h-auto"
    >
      <motion.div className="px-3 w-full">
        <motion.div
          ref={mainRef}
          initial="hidden"
          animate={control}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          className="w-full items-center flex justify-center flex-col"
        >
          <motion.div variants={itemsVariant}>
            <TitleChip title="Shorten link." filled={true} />
          </motion.div>
          <motion.div variants={itemsVariant}>
            <PageTitile name="A short link infinite possibilities" />
          </motion.div>
        </motion.div>
        <motion.div
          ref={mainRef}
          initial="hidden"
          animate={control}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          className="w-full flex flex-col gap-4 mt-3 text-center"
        >
          <motion.p
            variants={itemsVariant}
            className="md:text-xl w-full text-lg text-4 text-gray-500 md:w-1/2 m-auto"
          >
            Konnect is a custom link personalization tool that enable you
            target,engage, and drive more customers. Get Started for{" "}
            <span className="text-blue-600">free</span>
          </motion.p>
          <motion.div
            ref={mainRef}
            initial="hidden"
            animate={control}
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            className={`m-auto transition-all ease-linear flex ${
              openOptions ? "h-[28rem]" : "h-[13rem]"
            } flex-col gap-3 items-center justify-center  box-shadow rounded-lg px-5 w-full md:w-[min(70vw,60vw)]`}
          >
            {/* When Waiting for the API Response */}
            {loading && (
              <Logo loading={true} enableColor={true} showIcon={true} />
            )}
            <motion.form
              variants={itemsVariant}
              className="w-full flex gap-1 px-1 items-center py-1 rounded-lg h-[3rem] bg-gray-200"
              action=""
            >
              <motion.input
                value={link}
                onChange={(e) => handleChange(e)}
                variants={itemsVariant}
                placeholder="Paste your link here and shorten it"
                className="w-full h-full pl-1 outline-none bg-transparent"
                type="text"
              />
              <Button
                name="Shorten"
                filled={true}
                bigger={false}
                onClick={() => handleSubmit()}
              />
            </motion.form>
            {postResponse && (
              <div className="w-full relative overflow-auto  gap-2 items-center rounded-md border-solid border-[1.3px] border-blue-400 flex p-1">
                <p className="w-full text-left">{postResponse}</p>
                <div className="hidden-ssm">
                  <Button
                    filled={copied ? true : false}
                    name={copied ? "Copied" : "Copy"}
                    bigger={false}
                    onClick={() => {
                      handleCopying(postResponse).then(() => setCopied(true));
                    }}
                  />
                </div>
              </div>
            )}
            <motion.div
              variants={itemsVariant}
              className="relative flex items-center justify-center w-full"
            >
              <button
                onClick={handleOptionOpen}
                className="flex text-gray-500 items-center"
              >
                See{" "}
                <span
                  className={`${
                    openOptions ? "rotate-0" : "rotate-180"
                  } transition-all ease-linear`}
                >
                  <AiOutlineDown />
                </span>
              </button>
              {/* Open When True */}
              {openOptions && (
                <div className="flex absolute mt-8 top-0 w-full flex-col gap-2">
                  {TestLinks.map((konnect, i) => {
                    return (
                      <div key={i}>
                        {createdLinks(konnect.option, konnect.id)}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            variants={itemsVariant}
            className="pattern-bg px-7 py-10 text-white rounded-lg w-full"
          >
            {/* Illustration of konnect🔗 */}
            <div className="flex flex-col md:flex-row gap-5 w-full mt-3">
              <div className="basis-[50%] flex-col gap-3 w-full flex">
                <h2 className="text-left text-3xl text-6 md:text-6xl">
                  Short and manage your link 👉
                </h2>
                <p className="text-left text-gray-300">
                  You can short and manage your link in just one click. You need
                  to connect audiences worldwide,manage link and QR codes and
                  create brand relationship.
                </p>
              </div>
              <div className="w-full basis-[50%] flex">
                <Illustration dark={false} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ShortenLink;
