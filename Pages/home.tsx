"use client";

import AllLinkShorten, {
  firstComponentProps,
} from "@/Components/allLinkShorten";
import Box from "@/Components/box";
import GenerateLink from "@/Components/generateLink";
import GenerateQrCode from "@/Components/generateQrCode";
import { User } from "@/Types/types";
import Warning from "@/messages/warning";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlineLink, AiOutlineQrcode } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import PreviewWebPage from "./previewWebPage";
import { motion } from "framer-motion";
import Link from "next/link";

const Home = () => {
  const { data }: { data: any | User } = useSession();

  const [refresh, setRefresh] = useState(false); //Re-rendering the side effect to run a get request with this (like a state to keep track of when a user shorten a link)
  const [link, setLink] = useState("");
  const [allLinksShorten, setAllLinksShorten] = useState<firstComponentProps[]>(
    []
  );

  useEffect(() => {
    const getUserLink = async () => {
      axios
        .get(
          `https://konnect-api-soolaimang.onrender.com/get-all-user-link/${data.username}`
        )
        .then((res) => {
          setAllLinksShorten(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    data && getUserLink();
  }, [refresh]);

  const sort =
    allLinksShorten.length > 1
      ? allLinksShorten.sort((a, b) => b.createdOn - a.createdOn)
      : []; //Sort the list with time
  //TODO: couldve done this in the DB

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.1 }}
      className="w-full flex flex-col gap-5"
    >
      {!data?.emailVerified && (
        <Link
          className="cursor-pointer w-full"
          passHref
          href={`/verify-email/${data?.email}`}
        >
          <Warning message="Your email is not verified" />
        </Link>
      )}
      <div className="w-full grid-container-sm">
        <Box
          link="linkInBio"
          icon={<BiHash />}
          count={0}
          title="Links Created"
        />
        <Box
          link="shortenLink"
          icon={<AiOutlineLink />}
          count={allLinksShorten.length || 0}
          title="Links Shorten"
        />
        <Box
          link="qrCode"
          icon={<AiOutlineQrcode />}
          count={0}
          title="Qr Code"
        />
      </div>
      <div className="w-full flex-col gap-2 flex md:flex-row">
        <div className="md:basis-[65%] flex flex-col gap-2 basis-[100%]">
          <div className="w-full h-[19rem] md:h-[16rem]">
            <GenerateLink
              setRefresh={setRefresh}
              user={data?.username}
              link={link}
              setLink={setLink}
            />
          </div>
          <div className="w-full h-fit">
            <AllLinkShorten props={allLinksShorten} />
          </div>
        </div>
        <div className="md:basis-[35%] w-full flex flex-col gap-3 basis-[100%]">
          <PreviewWebPage link={sort[0]?.link} imageUrl="" />
          <GenerateQrCode link={sort[0]?.path} time={sort[0]?.createdOn} />
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
