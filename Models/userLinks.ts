import mongoose from "mongoose";

export type linkProps = {
  id: string;
  url: string;
  path: string;
  clicks: number;
  expires: number;
  createdOn: number;
  lastVisited: number;
  qrCode: string;
};

interface links {
  id: string;
  linksCreated: linkProps[];
  createdBy: string;
}

const Schema = mongoose.Schema;

const LinkDetails = new Schema<links>({
  linksCreated: [
    {
      id: { type: String },
      url: { type: String },
      path: { type: String },
      clicks: { type: Number },
      expires: { type: Number },
      createdOn: { type: Number },
      lastVisited: { type: Number },
      qrCode: { type: String },
    },
  ],
  createdBy: { type: String },
});

export const LinkModel =
  mongoose.models?.userlinks ?? mongoose.model("userlinks", LinkDetails);
