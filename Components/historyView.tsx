import { useFormatDate } from "@/Hooks";
import { ContextAPI } from "@/Providers/provider";
import { IconButton, Tooltip } from "@mui/material";
import axios, { AxiosError } from "axios";
import React, { useContext, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdDelete,
} from "react-icons/md";
import ConfirmPrompt from "./confirmPrompt";

interface historyProps {
  data: {
    _id: string;
    link: string;
    path: string;
    createdOn: number;
    views: number;
    domain: String;
    randomString: string;
    createdBy: string;
    is_custom: Boolean;
  }[];
}

const tablehead = [
  { header: "My Links" },
  { header: "Created On" },
  { header: "Views" },
  { header: "Type" },
  { header: "Action" },
];

/**
 * Renders a history view table.
 * @param {historyProps} props - The props object containing the data.
 * @returns {JSX.Element} The rendered history view table.
 */

const HistoryView = (props: historyProps): JSX.Element => {
  const [pages, setPages] = useState({
    start: 0,
    end: 5,
    currPage: 1,
  });
  const { dispatch } = useContext(ContextAPI);
  const [states, setStates] = useState({
    loading: false,
    errorCodes: 500,
  });

  const [showModal, setShowModal] = useState(false);

  //use this to paginate between pages with control
  const nextPage = (d: number) => {
    if (pages.end >= d) {
      return;
    }

    setPages({
      end: pages.end + 5,
      start: pages.start + 5,
      currPage: pages.currPage + 1,
    });
  };

  //use this to paginate between pages with control
  const prevPages = () => {
    if (pages.start <= 0 || pages.end === 5) {
      return;
    }

    setPages({
      end: pages.end - 5,
      start: pages.start - 5,
      currPage: pages.currPage - 1,
    });
  };

  const deleteLink = async (id: string) => {
    setStates({ ...states, loading: true });
    dispatch({ type: "loading" });

    axios
      .delete(`https://konnect-api-soolaimang.onrender.com/delete-link/${id}`)
      .then((response) => {
        dispatch({ type: "success", payload: response.data });
        setStates({ ...states, loading: false });
      })
      .catch((error: AxiosError) => {
        setStates({ ...states, loading: false });
        dispatch({
          type: "error",
          payload:
            error.response?.status === 404
              ? "Link not found"
              : "Internal Server Error",
        });
      });
  };

  const { data } = props;

  const f = (d: number) => {
    const data = useFormatDate(d);
    return data;
  };

  return (
    <div className="w-full overflow-auto bg-white rounded-md">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-600 text-white">
            {tablehead.map((header, i) => (
              <th
                key={i}
                className="text-lg p-2 border border-blue-200 whitespace-nowrap"
              >
                {header.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="even:bg-blue-200 text-blue-800">
          {data.slice(pages.start, pages.end).map((d, i) => {
            const date = f(d.createdOn);
            return (
              <tr key={i}>
                <td className="p-2 text-lg text-center border border-blue-200 whitespace-nowrap">
                  {d.path.slice(0, 10) + "..."}
                </td>
                <td className="p-2 text-lg text-center border border-blue-200 whitespace-nowrap">
                  {date}
                </td>
                <td className="p-2 text-lg text-center border border-blue-200 whitespace-nowrap">
                  {d.views}
                </td>
                <td className="p-2 text-lg text-center border border-blue-200 whitespace-nowrap">
                  {d.is_custom ? "Custom" : "Regular"}
                </td>
                <td className="p-2 border border-blue-200 w-full flex items-center justify-center whitespace-nowrap">
                  <ConfirmPrompt
                    button={
                      <button
                        onClick={() => setShowModal(true)}
                        className="p-2 text-white rounded-md bg-red-500 hover:bg-red-600"
                      >
                        <MdDelete />
                      </button>
                    }
                    open={showModal}
                    setOpen={setShowModal}
                  >
                    <div className="w-full flex flex-col gap-3">
                      <p className="text-3xl text-red-500">
                        Do you want to delete this link?
                      </p>
                      <span className="text-red-100">
                        Please note that this action is irreversible
                      </span>
                      <div className="w-full flex items-center gap-2">
                        <button className="w-full py-2 text-center text-lg bg-blue-200 rounded-md hover:bg-blue-800 text-white">
                          Cancel
                        </button>
                        <button
                          onClick={() => deleteLink(d._id)}
                          className="w-full py-2 text-center text-lg bg-red-600 rounded-md hover:bg-red-800 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </ConfirmPrompt>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-full px-2 h-[3rem] flex justify-between items-center mt-2">
        <p className="text-xl flex gap-1">
          Pages: <strong className="text-blue-600">{pages.currPage}</strong>
        </p>
        <div className="flex gap-2">
          <Tooltip title="Prev Page">
            <IconButton
              onClick={() => {
                prevPages();
              }}
            >
              <MdOutlineKeyboardArrowLeft />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next Page">
            <IconButton
              onClick={() => {
                nextPage(data.length as number);
              }}
            >
              <MdOutlineKeyboardArrowRight />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default HistoryView;
