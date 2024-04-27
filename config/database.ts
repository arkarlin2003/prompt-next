"use server";
import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected!");
    return;
  }

  try {
    await mongoose.connect(process.env.DB as string, {
      dbName: "next",
    });

    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
