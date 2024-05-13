// pages/api/health.ts

import clientPromise from "@/dbmongoclient";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: string;
  dbStatus?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      await clientPromise; // Asegúrate de que la conexión a la base de datos esté establecida
      const dbStatus =
        mongoose.connection.readyState === 1 ? "connected" : "disconnected";

      res.status(200).json({ status: "ok", dbStatus });
    } catch (error) {
      res.status(500).json({ status: "error", dbStatus: "disconnected" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
