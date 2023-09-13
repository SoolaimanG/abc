import { AiFillQuestionCircle } from "react-icons/ai";
import { ChangeEvent, useEffect, useId, useState } from "react";
import { FiUpload } from "react-icons/fi";
import Input from "./input";
import ControlledSwitch from "./switch";
import SliderSizes from "./slider";
import { useStore3 } from "@/Providers/zustand";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { bgTypes, btnTypes } from "@/utils/data";
import BasicAccordion from "./accordion";

export const Divider = (props: { text: string }) => {
  return (
    <div className="w-full gap-2 flex items-center">
      <div className="w-full h-[1.4px] bg-gray-300" />
      <p className="text-lg">{props.text}</p>
      <div className="w-full h-[1.4px] bg-gray-300" />
    </div>
  );
};

export const box = ({ props }: { props: React.ReactNode }) => {
  return (
    <div className="p-2 rounded-md bg-white shadow-md border-solid border-[1.5px] border-gray-300">
      {props}
    </div>
  );
};

const Design = () => {
  const id = useId();
  const store = useStore3((state) => state);
  const [profile, setProfile] = useState<File | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [secbackgroundImage, setSecBackgroundImage] = useState<File | null>(
    null
  );
  const [profileBio, setProfileBio] = useState("");
  const [iconSize, setIconSize] = useState(store.socialMediaIconSize);
  const [profilePicShadow, setProfileShadow] = useState(
    store.profilePictureShadow
  );
  const [profileBorders, setProfileBorders] = useState(store.profilePicBorder);
  const [primaryText, setPrimaryText] = useState(store.textColor);
  const [primaryBgColor, setPrimaryBgColor] = useState(store.backgroundColor);
  const [toggleSecondary, setToggleSecondary] = useState(store.haveSecondary);
  const [shadowType, setShadowType] = useState<"soft" | "solid" | "none">(
    store.buttonShadow as "soft" | "solid" | "none"
  );
  const [secondaryBGColor, setSecondaryBGColor] = useState(
    store.secondaryBGColor
  );
  const [toggleShare, setToggleShare] = useState(store.enableShareButton);
  const [btnBorderRadius, setBtnBorderRadius] = useState(
    store.buttonBorderRadius
  );
  const [collapseBio, setCollapseBio] = useState(store.bioCollapse);
  const [showIconBorders, setShowIconBorders] = useState(
    store.addBorderToSocialIcon
  );
  const [hideSocial, setHideSocial] = useState(store.hideSocial);
  const [buttonColor, setButtonColor] = useState(store.buttonColor);
  const [butttonBackground, setButttonBackground] = useState(
    store.buttonBackgroundColor
  );
  const [gap, setGap] = useState(store.gap);
  const [showbackgroundType, setShowBackgroundType] = useState(false);
  const [backgroundType, setBackgroundTypes] = useState(store.backgroundType);
  const [hideName, setHideName] = useState(store.hideName);
  const [isLinear, setIsLinear] = useState(store.isLinear);
  const [firstColor, setFirstColor] = useState(store.firstColor);
  const [secondColor, setSecondColor] = useState(store.secondColor);
  const [showBtnTypes, setShowBtnTypes] = useState(false);
  const [secondaryType, setSecondaryType] = useState<"Image" | "Color">(
    store.secondaryTypes
  );
  const [hideBio, setHideBio] = useState(store.hideBio);

  //Profile Image Change
  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setProfile(selectedFile);
    }
  };

  //Background Image Change
  const handleBackgroundImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setBackgroundImage(selectedFile);
    }
  };

  //Secondary Background Image Change
  const handleSecondarybgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setSecBackgroundImage(selectedFile);
    }
  };

  //Change the primary change color
  const handlePrimaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.setPrimaryBackgroundColor(e.target.value);
    setPrimaryBgColor(e.target.value);
  };

  //Change the primary text color
  const handlePrimaryTextColor = (e: ChangeEvent<HTMLInputElement>) => {
    store.settextColor(e.target.value);
    setPrimaryText(e.target.value);
  };

  //Change the secondary bg change
  const handleSecondaryBGChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.setSecondaryBgColor(e.target.value);
    setSecondaryBGColor(e.target.value);
  };

  //Changing the button text color
  const handleButtonTextColor = (e: ChangeEvent<HTMLInputElement>) => {
    store.setButtonColor(e.target.value);
    setButtonColor(e.target.value);
  };

  //Chnaging the background color for buttons
  const handleButtonBackgroudColor = (e: ChangeEvent<HTMLInputElement>) => {
    store.setButtonBackgroundColor(e.target.value);
    setButttonBackground(e.target.value);
  };

  //Changing the shadow
  const handleShadowType = (props: "soft" | "solid" | "none") => {
    store.setButtonShadow(props);
    setShadowType(props);
  };

  //Change the first color of the gradient
  const handleFirstColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.setFirstColor(e.target.value);
    setFirstColor(e.target.value);
  };

  //Change the second color of the radient
  const handleSecondColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondColor(e.target.value);
    store.setSecondColor(e.target.value);
  };

  //Select the type of background you want!
  const selectBgType = (props: "image" | "color" | "gradient") => {
    store.setBackgroundTypes(props);
    setBackgroundTypes(props);
  };

  //Setting Profile
  useEffect(() => {
    if (profile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        store.addProfilePicture(e.target?.result as string);
      };

      reader.readAsDataURL(profile);
    }
  }, [profile]);

  //Setting Background Image
  useEffect(() => {
    if (backgroundImage) {
      const reader = new FileReader();

      reader.onload = (e) => {
        store.setBackgroundImage(e.target?.result as string);
      };

      reader.readAsDataURL(backgroundImage);
    }
  }, [backgroundImage]);

  //Add Image to Secondary Background
  useEffect(() => {
    if (secbackgroundImage) {
      const reader = new FileReader();

      reader.onload = (e) => {
        store.setSecondaryBackgroundImage(e.target?.result as string);
      };

      reader.readAsDataURL(secbackgroundImage);
    }
  }, [secbackgroundImage]);

  //Set ProfileBio
  useEffect(() => {
    //
    store.addProfileBio(profileBio);
  }, [profileBio]);

  //Set IconSize
  useEffect(() => {
    //
    store.setSocialIconSize(iconSize as number);
  }, [iconSize]);

  //Set ProfileShadow
  useEffect(() => {
    //
    store.setProfilePicShadows(profilePicShadow as number);
  }, [profilePicShadow]);

  //Toggle Bio
  useEffect(() => {
    //
    store.setHideBio(hideBio);
  }, [hideBio]);

  //Set ProfileShadow
  useEffect(() => {
    //
    store.setProfilePicBorder(profileBorders);
  }, [profileBorders]);

  //Toggle Secondary
  useEffect(() => {
    //
    store.setSecondary(toggleSecondary as boolean);
  }, [toggleSecondary]);

  //Toggle Share
  useEffect(() => {
    //
    store.setEnableShare(toggleShare as boolean);
  }, [toggleShare]);

  //Toggle border Radius
  useEffect(() => {
    //
    store.setButtonRadius(btnBorderRadius as number);
  }, [btnBorderRadius]);

  //Collapse Long Bio
  useEffect(() => {
    //
    store.collapseBio(collapseBio);
  }, [collapseBio]);

  //Set Gap
  useEffect(() => {
    //
    store.setGap(gap);
  }, [gap]);

  //Toggle Border on icons
  useEffect(() => {
    //
    store.setToggleBorderSocial(showIconBorders as boolean);
  }, [showIconBorders]);

  //Toggle Icon Name
  useEffect(() => {
    //
    store.setHideName(hideName);
  }, [hideName]);

  //Toggle Between linear and radial
  useEffect(() => {
    //
    store.setIsLinear(isLinear as boolean);
  }, [isLinear]);

  //Toggle Between linear and radial
  useEffect(() => {
    //
    store.setHideSocial(hideSocial);
  }, [hideSocial]);

  return (
    <div>
      <div className="mt-3 flex flex-col gap-2 p-2">
        {/* Header */}
        <header className="w-full">{Divider({ text: "Header" })}</header>
        <label
          htmlFor={id}
          className="p-2 shadow-md border-solid border-[1.5px] border-gray-300 cursor-pointer flex items-center justify-between rounded-md bg-white"
        >
          <div>
            <p className="text-lg">Profile Picture</p>
            {profile && <span>{profile.name}</span>}
          </div>
          <div className="border-solid p-2 border-[1.5px] border-gray-300 rounded-full">
            <FiUpload />
            <input
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
              type="file"
              name={id}
              id={id}
            />
          </div>
        </label>
        <label>
          Profile bio
          <Input
            type="textarea"
            includeBorder={true}
            disabled={false}
            value={profileBio}
            setValue={setProfileBio}
            placeholder="I am a graphic designer"
          />
        </label>
        <div className="p-2 rounded-md w-full shadow-md border-solid border-[1.5px] border-gray-300 bg-white flex items-center justify-between">
          <div className="flex items-center gap-1">
            <AiFillQuestionCircle className="text-blue-600" />
            <span>Collapse long bio</span>
          </div>
          <div className="">
            <ControlledSwitch
              checked={collapseBio}
              setChecked={setCollapseBio}
            />
          </div>
        </div>
        <div className="p-2 rounded-md w-full shadow-md border-solid border-[1.5px] border-gray-300 bg-white flex items-center justify-between">
          <div className="flex items-center gap-1">
            <AiFillQuestionCircle className="text-blue-600" />
            <span>Hide icon name</span>
          </div>
          <div className="">
            <ControlledSwitch checked={hideName} setChecked={setHideName} />
          </div>
        </div>
        {box({
          props: (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1">
                <AiFillQuestionCircle className="text-blue-600" />
                <span>Show border on icon</span>
              </div>
              <div>
                <ControlledSwitch
                  checked={showIconBorders as boolean}
                  setChecked={setShowIconBorders as any}
                />
              </div>
            </div>
          ),
        })}
        {box({
          props: (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1">
                <AiFillQuestionCircle className="text-blue-600" />
                <span>Hide Bio</span>
              </div>
              <div>
                <ControlledSwitch
                  checked={hideBio as boolean}
                  setChecked={setHideBio as any}
                />
              </div>
            </div>
          ),
        })}
        {box({
          props: (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1">
                <AiFillQuestionCircle className="text-blue-600" />
                <span>Hide Social Icon</span>
              </div>
              <div>
                <ControlledSwitch
                  checked={hideSocial as boolean}
                  setChecked={setHideSocial as any}
                />
              </div>
            </div>
          ),
        })}
        {/*  */}
        <div className="w-full flex flex-col md:flex-row items-center">
          <p className="w-full">Social icon size</p>
          <SliderSizes
            value={iconSize as number}
            defaultNum={store.socialMediaIconSize as number}
            setValue={setIconSize as any}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row items-center">
          <p className="w-full">Profile Pic shadow</p>
          <SliderSizes
            value={profilePicShadow as number}
            defaultNum={store.profilePictureShadow as number}
            setValue={setProfileShadow as any}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row items-center">
          <p className="w-full">Profile Pic border</p>
          <SliderSizes
            value={profileBorders}
            defaultNum={store.profilePicBorder}
            setValue={setProfileBorders}
          />
        </div>
        {Divider({ text: "General" })}
        {box({
          props: (
            <div
              onClick={() => setShowBackgroundType((prev) => !prev)}
              className="w-full cursor-pointer flex items-center justify-between"
            >
              <span>Select your background type</span>
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
            </div>
          ),
        })}

        {showbackgroundType &&
          box({
            props: (
              <div className="flex cursor-pointer bg-white items-center flex-col gap-4">
                {bgTypes.map((_, i) => (
                  <span
                    onClick={() => {
                      selectBgType(_.type);
                    }}
                    className={`text-lg ${
                      _.type === backgroundType && "text-blue-600"
                    } hover:text-blue-600`}
                    key={i}
                  >
                    {_.type.toUpperCase()}
                  </span>
                ))}
              </div>
            ),
          })}
        {showbackgroundType &&
          backgroundType === "image" &&
          box({
            props: (
              <label
                htmlFor={"bgImg"}
                className="cursor-pointer flex items-center justify-between rounded-md bg-white"
              >
                <div>
                  <p className="text-lg">Background Image</p>
                  {backgroundImage && <span>{backgroundImage.name}</span>}
                </div>
                <div className="border-solid p-2 border-[1.5px] border-gray-300 rounded-full">
                  <FiUpload />
                  <input
                    accept="image/*"
                    onChange={handleBackgroundImageChange}
                    className="hidden"
                    type="file"
                    name={"bgImg"}
                    id={"bgImg"}
                  />
                </div>
              </label>
            ),
          })}
        {showbackgroundType &&
          backgroundType === "color" &&
          box({
            props: (
              <label
                htmlFor="primaryBg"
                className="w-full flex items-center justify-between"
              >
                <span>Background Color</span>
                <div
                  style={{
                    background: store.backgroundColor,
                  }}
                  className="w-6 h-6 rounded-full"
                />
                <input
                  onChange={handlePrimaryChange}
                  className="hidden"
                  type="color"
                  name="primaryBg"
                  id="primaryBg"
                />
              </label>
            ),
          })}

        {/* Gradient Color */}
        {showbackgroundType &&
          backgroundType === "gradient" &&
          box({
            props: (
              <label
                htmlFor="firstColor"
                className="w-full flex items-center justify-between"
              >
                <span>First Color</span>
                <div
                  style={{
                    background: store.firstColor,
                  }}
                  className="w-6 h-6 rounded-full"
                />
                <input
                  onChange={handleFirstColorChange}
                  className="hidden"
                  type="color"
                  name="firstColor"
                  id="firstColor"
                />
              </label>
            ),
          })}
        {showbackgroundType &&
          backgroundType === "gradient" &&
          box({
            props: (
              <label
                htmlFor="secondColor"
                className="w-full flex items-center justify-between"
              >
                <span>Second Color</span>
                <div
                  style={{
                    background: store.secondColor,
                  }}
                  className="w-6 h-6 rounded-full"
                />
                <input
                  onChange={handleSecondColorChange}
                  className="hidden"
                  type="color"
                  name="secondColor"
                  id="secondColor"
                />
              </label>
            ),
          })}
        {showbackgroundType &&
          backgroundType === "gradient" &&
          box({
            props: (
              <div className="rounded-md w-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Toggle Linear or Radian</span>
                </div>
                <div className="">
                  <ControlledSwitch
                    checked={isLinear as boolean}
                    setChecked={setIsLinear as any}
                  />
                </div>
              </div>
            ),
          })}
        {box({
          props: (
            <div
              onClick={() => setShowBtnTypes((prev) => !prev)}
              className="w-full cursor-pointer flex items-center justify-between"
            >
              <span>Select your button type</span>
              <span>
                <MdOutlineKeyboardArrowDown />
              </span>
            </div>
          ),
        })}
        {showBtnTypes &&
          box({
            props: (
              <div className="flex items-center justify-center flex-col gap-3 w-full">
                {btnTypes.map((_, i) => (
                  <button
                    className={`hover:text-blue-600 ${
                      store.buttonType === _.type && "text-blue-600"
                    }`}
                    onClick={() => {
                      store.setBtnType(_.type);
                    }}
                    key={i}
                  >
                    {_.type.toUpperCase()}
                  </button>
                ))}
              </div>
            ),
          })}
        {box({
          props: (
            <label
              htmlFor="buttonBGColor"
              className="w-full flex items-center justify-between"
            >
              <span>Button BackgroudColor</span>
              <div
                style={{
                  background: store.buttonBackgroundColor,
                }}
                className="w-6 h-6 rounded-full"
              />
              <input
                onChange={handleButtonBackgroudColor}
                className="hidden"
                type="color"
                name="buttonBGColor"
                id="buttonBGColor"
              />
            </label>
          ),
        })}
        {box({
          props: (
            <label
              htmlFor="BgTextPrimary"
              className="w-full flex items-center justify-between"
            >
              <span>Button TextColor</span>
              <div
                style={{ background: buttonColor ? buttonColor : "#252525" }}
                className="w-6 h-6 rounded-full"
              />
              <input
                onChange={handleButtonTextColor}
                className="hidden"
                type="color"
                name="BgTextPrimary"
                id="BgTextPrimary"
              />
            </label>
          ),
        })}
        {box({
          props: (
            <label
              htmlFor="primary"
              className="w-full flex items-center justify-between"
            >
              <span>Primary text color</span>
              <div
                style={{ background: primaryText ? primaryText : "#252525" }}
                className="w-6 h-6 rounded-full"
              />
              <input
                onChange={handlePrimaryTextColor}
                className="hidden"
                type="color"
                name="primary"
                id="primary"
              />
            </label>
          ),
        })}

        {/* Type Of Secondary Background you want! */}
        <div className="p-2 rounded-md w-full shadow-md border-solid border-[1.5px] border-gray-300 bg-white flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span>Add Secondary Background</span>
          </div>
          <div className="">
            <ControlledSwitch
              checked={toggleSecondary as boolean}
              setChecked={setToggleSecondary as any}
            />
          </div>
        </div>
        {toggleSecondary &&
          box({
            props: (
              <div>
                <p className="text-center w-full text-lg text-blue-600">
                  Choose type of secondary background you want to use
                </p>
                <div className="flex flex-col w-full items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      store.setSecondaryType("Color");
                      setSecondaryType("Color");
                    }}
                    className={`${
                      secondaryType === "Color" && "text-blue-600 font-semibold"
                    } hover:text-blue-600 text-lg`}
                  >
                    Background color
                  </button>
                  <button
                    onClick={() => {
                      store.setSecondaryType("Image");
                      setSecondaryType("Image");
                    }}
                    className={`${
                      secondaryType === "Image" && "text-blue-600 font-semibold"
                    } hover:text-blue-600 text-lg`}
                  >
                    Background Image
                  </button>
                </div>
              </div>
            ),
          })}
        {toggleSecondary &&
          secondaryType === "Color" &&
          box({
            props: (
              <label
                htmlFor="secondaryBg"
                className="w-full flex items-center justify-between"
              >
                <span>Secondary Background</span>
                <div
                  style={{
                    background: secondaryBGColor ? secondaryBGColor : "#252525",
                  }}
                  className="w-6 h-6 rounded-full"
                />
                <input
                  onChange={handleSecondaryBGChange}
                  className="hidden"
                  type="color"
                  name="secondaryBg"
                  id="secondaryBg"
                />
              </label>
            ),
          })}
        {toggleSecondary && secondaryType === "Image" && (
          <label
            htmlFor="sec"
            className="p-2 shadow-md border-solid border-[1.5px] border-gray-300 cursor-pointer flex items-center justify-between rounded-md bg-white"
          >
            <div>
              <p className="text-lg">Secondary Image</p>
              {secbackgroundImage && <span>{secbackgroundImage.name}</span>}
            </div>
            <div className="border-solid p-2 border-[1.5px] border-gray-300 rounded-full">
              <FiUpload />
              <input
                accept="image/*"
                onChange={handleSecondarybgChange}
                className="hidden"
                type="file"
                name="sec"
                id="sec"
              />
            </div>
          </label>
        )}
        {/* Shadow Types */}
        <div>
          {box({
            props: (
              <div className="w-full flex items-end justify-around">
                <button
                  onClick={() => {
                    handleShadowType("solid");
                  }}
                  className={`${shadowType === "solid" && "text-blue-600"}`}
                >
                  Solid Shadow
                </button>
                <button
                  className={`${shadowType === "soft" && "text-blue-600"}`}
                  onClick={() => {
                    handleShadowType("soft");
                  }}
                >
                  Soft Shadow
                </button>
                <button
                  className={`${shadowType === "none" && "text-blue-600"}`}
                  onClick={() => {
                    handleShadowType("none");
                  }}
                >
                  None
                </button>
              </div>
            ),
          })}
        </div>
        {Divider({ text: "Cards" })}
        <BasicAccordion />
        <div className="w-full flex flex-col md:flex-row items-center">
          <p className="w-full">Button corners</p>
          <SliderSizes
            value={btnBorderRadius as number}
            defaultNum={store.buttonBorderRadius as number}
            setValue={setBtnBorderRadius as any}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row items-center">
          <p className="w-full">Button gaps</p>
          <SliderSizes
            value={gap}
            defaultNum={store.gap as number}
            setValue={setGap}
          />
        </div>
        {Divider({ text: "Social" })}
        {box({
          props: (
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1">
                <AiFillQuestionCircle className="text-blue-600" />
                <span>Enable Share Button</span>
              </div>
              <div>
                <ControlledSwitch
                  checked={toggleShare as boolean}
                  setChecked={setToggleShare as any}
                />
              </div>
            </div>
          ),
        })}
      </div>
    </div>
  );
};

export default Design;
