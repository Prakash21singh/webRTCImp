import { clsx, type ClassValue } from "clsx";
import mongoose from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const RETRY = 3;
let count = 0;
async function connectDb() {
  if (count >= RETRY) return;
  try {
    const connection = mongoose.connect("mongodb://localhost:27017/webrtc");
    console.log("Mongodb connected successfully!");
    return connection;
  } catch (error) {
    count++;
    console.log(
      `Error connecting database⭕ : ${error}: Trying for the ${count + 1}`
    );
    setTimeout(() => {
      connectDb();
    }, 3000);
  }
}

export { connectDb };
