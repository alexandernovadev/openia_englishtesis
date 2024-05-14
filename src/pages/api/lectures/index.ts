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
        const { lectureID, content, level, topic } = req.body;
        const newLecture = new LectureModel({
          lectureID,
          content,
          level,
          topic,
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
        const lectures = await LectureModel.find();
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
