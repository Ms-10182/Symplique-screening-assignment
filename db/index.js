import mongoose from "mongoose";
import { dbName } from "../constants.js";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${dbName}`
    );
    console.log(`connection successful, host: ${connection.connection.host}`);
  } catch (error) {
    console.error("connection failed");
    process.exit(1);
  }
};

export { connectDb };
