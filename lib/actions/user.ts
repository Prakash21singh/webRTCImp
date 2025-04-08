"use server";

import User from "../models/user.model";
import { connectDb } from "../utils";

async function createUser({
  userName,
  email,
}: {
  userName: string;
  email: string;
}) {
  connectDb();

  try {
    const newUser = new User({
      userName,
      email,
    });

    await newUser.save();

    return newUser;
  } catch (error: any) {
    throw new Error(`Error creating database:${error.message}`);
  }
}

export { createUser };
