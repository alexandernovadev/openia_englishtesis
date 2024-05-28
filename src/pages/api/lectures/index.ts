// src/pages/api/lectures/index.ts
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import clientPromise from "@/dbmongoclient";
import LectureModel from "@/dbmongoclient/models/lecture";

const lecturesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await clientPromise; // Asegúrate de que la conexión a la base de datos esté establecida

  switch (req.method) {
    case "POST":
      try {
        const { content, level, topic,img } = req.body;
        const newLecture = new LectureModel({
          content,
          level,
          topic,
          img
        });
        await newLecture.save();
        res.status(201).json(newLecture);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    case "GET":
      try {
        const { filter, limit =20 } = req.query;
        const query = filter ? { topic: new RegExp(filter as string, 'i') } : {};

        const lectures = await LectureModel.find(query)
          .sort({ createdAt: -1 })
          .limit(Number(limit));
          
        res.status(200).json(lectures);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
};

export default lecturesHandler;
