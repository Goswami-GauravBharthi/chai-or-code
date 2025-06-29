import mongoose from "mongoose";
// import { DB_NAME } from "../constant.js";
import "dotenv/config";

//! must use try / catch and async await to connect database


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/chaiDataBase` 
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ",error.message);
    process.exit(1);
  } 
};

export default connectDB;
