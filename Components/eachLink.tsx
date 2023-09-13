import React, { useEffect, useState } from "react";
import Input from "./input";
import { CgMenuGridO } from "react-icons/cg";
import { BiSolidPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useStore3 } from "@/Providers/zustand";
import ButtonTwo from "./buttonTwo";
import { socialMediaPlatforms } from "@/utils/data";

type eachLinkProps = {
  path: string;
  placeholder: string;
  id: number;
  icon: React.ReactElement;
};

const EachLink = (props: eachLinkProps) => {
  const [link, setLink] = useState("");
  const { id, placeholder } = props;
  const [startDrag, setStartDrag] = useState(false);
  const updateSocials = useStore3((state) => state.removeSocialMedia);
  const linkState = useStore3((state) => state.updateSocialLink);

  const [showName, setShowName] = useState(false);

  const handleDelete = () => {
    updateSocials(id); // Update the socials state with the new array or an empty array if newArray is falsy
  };

  //updating the social links
  useEffect(() => {
    //@ts-ignore
    linkState({ link: link, id: id });
  }, [link]); //TODO:Error here come back

  return (
    <div>
      <form className="flex items-center gap-2" action="">
        <Input
          includeBorder={true}
          value={link}
          placeholder={`${placeholder} URL`}
          disabled={startDrag}
          setValue={setLink}
          type="text"
        />
        <div className="flex flex-col gap-1">
          <span className="text-xl relative cursor-pointer text-blue-500">
            <BiSolidPencil onClick={() => setShowName(true)} />
            {showName && (
              <div className="absolute gap-2 flex flex-col bg-gray-200 rounded-lg px-1 py-2 w-[15rem] bottom-0 mb-8 right-0">
                <Input
                  disabled={false}
                  value={""}
                  setValue={() => {}}
                  includeBorder={true}
                  placeholder="Add name to icon.."
                  type="text"
                />
                <ButtonTwo
                  text="Done"
                  disabled={false}
                  filled={true}
                  rounded={true}
                  hover={false}
                  onClick={() => {
                    setShowName(false);
                  }}
                />
              </div>
            )}
          </span>
          <span
            onClick={handleDelete}
            className="text-xl cursor-pointer text-red-400"
          >
            <AiFillDelete />
          </span>
        </div>
      </form>
    </div>
  );
};

export default EachLink;
