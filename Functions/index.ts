const mongoose = require("mongoose");
import { UserModal } from "@/Models";
import { v4 as uuidv4 } from "uuid";

//Write a function to connect to mongo DB
const MONGODB_URI = process.env.MONGO; //From .dotEnvironment
export const connectDB = async () =>
  mongoose
    .connect(MONGODB_URI as string, {
      socketTimeoutMS: 3000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection established");
    });

export const closeConnection = async () => mongoose.connection.close();

//Functions for generating stuffs
export const generateRandomProfileImage = async () => {
  const res = await fetch("https://api.multiavatar.com/Binx Bond.png");

  return res.url;
};

//Generate a random token to verify users
export const generateVerifyEmailToken = async () => {
  let error;
  const token = uuidv4();
  try {
    await UserModal.findOneAndUpdate({ verifyAccountToken: token });
  } catch (error) {
    error = error;
  }
  //Handling error
  if (error) {
    return "Error";
  } else {
    return token;
  }
};
