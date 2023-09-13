import EmptyState from "@/Components/emptyState";
import { ContextAPI } from "@/Providers/provider";
import React, { useContext, useEffect, useState } from "react";
import { FiLink2 } from "react-icons/fi";
//import

type props = {
  title: string;
  description: string;
  url: string;
  image: string;
};

const PreviewWebPage = ({
  link,
  imageUrl,
}: {
  link: string;
  imageUrl: string;
}) => {
  const [previewPage, setPreviewPage] = useState<props | null>(null);
  const { dispatch } = useContext(ContextAPI); //Send alerts to user

  //Use to preview the web the user gets back
  useEffect(() => {
    const url = `http://api.linkpreview.net/?key=${
      process.env.NEXT_PUBLIC_PREVIEW_SITE
    }&q=${encodeURIComponent(link)}`;

    //Preview page and show to client
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        !data?.error ? setPreviewPage(data) : setPreviewPage(null);
      } catch (error) {
        setPreviewPage(null);
        dispatch({ type: "error", payload: "Cannnot preview this page" });
      }
    }

    fetchData();
  }, [link]);

  return (
    <div className="w-full flex flex-col gap-3 px-1 py-3 bg-white rounded-md">
      <h2 className="text-xl font-semibold">Preview page</h2>
      {/* Image */}
      <div className="bg-gray-200 p-1 h-[15rem] rounded-md w-full">
        {previewPage ? (
          <div className="w-full relative h-full">
            <img
              className="w-full p-1 rounded-lg h-full"
              src={previewPage.image}
              alt={previewPage.title}
            />
            <span className="absolute text-lg bottom-0 text-blue-600 left-0 line-clamp-2">
              {previewPage?.description}
            </span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <EmptyState title="No page to preview" />
          </div>
        )}
      </div>
      <div className="w-full px-1 cursor-pointer py-2 flex items-center gap-2 border-solid rounded-md border-[1.5px] border-gray-400">
        <span className="text-blue-600 text-lg">
          <FiLink2 />
        </span>
        <p>{link ? link : "No link to show"}</p>
      </div>
    </div>
  );
};

export default PreviewWebPage;
