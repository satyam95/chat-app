import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;
