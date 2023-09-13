import { AiOutlineCheck, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  BsFillClipboardPlusFill,
  BsFillShareFill,
  BsQuestionCircle,
} from "react-icons/bs";
import { handleCopying } from "@/utils";
import { useEffect, useLayoutEffect, useState } from "react";
import { contentsToAdd, socialMediaPlatforms } from "@/utils/data";
import EachLink from "./eachLink";
import ContentToAddComp from "./contentToAdd";
import { useStore3 } from "@/Providers/zustand";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User, socialMediaTypes } from "@/Types/types";
import Image from "next/image";

const Content = () => {
  const [showIcons, setShowIcons] = useState(false);
  const updateStates = useStore3((state) => state.addSocialMedia);
  const [isCopied, setIsCopied] = useState(false);
  const { data } = useSession() as { data: User | null }; //Forcing it to satisfies user types
  const socialChoose: socialMediaTypes[] | undefined = useStore3(
    (state) => state.socialMedia
  );
  const url =
    typeof window !== "undefined" &&
    "location" in window &&
    `${window.location.origin}/${data?.username}`;

  //Change funtion is implemented from the provider so head to --> Providers --> Zustand
  const addSocialMedia = ({ id }: { id: number }) => {
    const findSocial = socialChoose?.find((s) => {
      return s.id === id;
    });

    if (findSocial) {
      //!If the use selected the item already do not allow to select again
      return;
    }

    //Knowing what to add
    const filterSocial = socialMediaPlatforms.find(
      (socialMedia) => socialMedia.id === id
    );

    const socialProperties = {
      ...filterSocial,
      link: "",
      path: "",
    };

    updateStates(socialProperties as any);
  };

  const sortedList = socialChoose?.sort((a, b) => b.order - a.order);

  useLayoutEffect(() => {
    isCopied &&
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
  }, [isCopied]);

  const openShareAPI = () => {
    const shareData = {
      title: "Konnect (A all in one link website)",
      text: `Check out ${data?.username} link in bio with Konnect`,
      url: url as string,
    };
    //Open The Native Share API
    navigator.share(shareData);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="mt-3 items-center justify-between flex w-full p-2">
        <div className="items-center flex gap-2">
          <Link className="text-[1rem] text-blue-600 underline" href={"/"}>
            {url}
          </Link>
          <BsFillClipboardPlusFill
            className="cursor-pointer"
            size={15}
            onClick={() => {
              handleCopying(url as string).then(() => {
                setIsCopied(true);
              });
            }}
          />
        </div>
        <span
          onClick={openShareAPI}
          className={`p-2 cursor-pointer shadow-md ${
            isCopied ? "text-green-500" : "bg-blue-500 text-white"
          } rounded-md`}
        >
          {isCopied ? <AiOutlineCheck /> : <BsFillShareFill />}
        </span>
      </div>

      <div className="w-full h-[1.5px] bg-gray-300" />
      <div className="w-full flex items-center justify-center px-3">
        <div
          onClick={() => {
            setShowIcons((prev) => !prev);
          }}
          className="bg-gray-200 shadow-md cursor-pointer w-full px-3 py-2 flex items-center justify-between rounded-md"
        >
          <span className="flex items-center gap-2">
            <BsQuestionCircle className="text-blue-600" /> Social media icons
          </span>
          <span>{showIcons ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
        </div>
      </div>
      {showIcons && (
        <div className="w-full flex flex-col px-6 gap-2">
          <div className="w-full flex flex-wrap gap-2">
            {socialMediaPlatforms.map((platform) => (
              <div
                onClick={() => addSocialMedia({ id: platform.id })}
                className="bg-blue-200 hover:shadow-md flex cursor-pointer items-center gap-1 p-1 rounded-md"
                key={platform.id}
              >
                <Image
                  src={platform.icon}
                  width={20}
                  height={20}
                  priority
                  alt="Icon"
                />
                <p>{platform.name}</p>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-1">
            {(socialChoose?.length as any) > 0 &&
              sortedList?.map((social) => (
                <EachLink
                  id={social.id}
                  placeholder={social.name}
                  key={social.id}
                  path="link"
                  icon={<AiOutlineMinus />}
                />
              ))}
          </div>
        </div>
      )}
      <div className="w-full px-3">
        <div className="bg-gray-200 rounded-md p-2">
          <p className="text-center text-2xl">Start adding content</p>
          <div className="grid-container-sm mt-3">
            {contentsToAdd.map((content) => (
              <ContentToAddComp
                id={content.id}
                desc={content.desc}
                name={content.name}
                key={content.id}
                icon={content.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
