// pages/api/register.ts

import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import mongoose from "mongoose";
import UserModel from "@/dbmongoclient/models/user";
import clientPromise from "@/dbmongoclient";

const secret = process.env.JWT_SECRET || "your_jwt_secret";

const registerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { username, email, password, role, languagePreference } = req.body;

  if (!username || !email || !password || !role || !languagePreference) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await clientPromise; // Asegúrate de que la conexión a la base de datos esté establecida

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      userID: new mongoose.Types.ObjectId().toString(),
      username,
      email,
      passwordHash: hashedPassword,
      role,
      languagePreference,
    });

    await newUser.save();

    const token = jwt.sign(
      { userID: newUser.userID, email: newUser.email, role: newUser.role },
      secret,
      { expiresIn: "1h" }
    );

    res.setHeader(
      "Set-Cookie",
      serialize("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default registerHandler;
