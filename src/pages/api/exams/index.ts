import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { ExamModel } from "@/dbmongoclient/models/exam";
import clientPromise from "@/dbmongoclient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await clientPromise; // Asegúrate de que la conexión a la base de datos esté establecida

  switch (req.method) {
    case "GET":
      try {
        const exams = await ExamModel.find();
        res.status(200).json(exams);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch exams" });
      }
      break;

    case "POST":
      try {
        const newExam = new ExamModel(req.body);
        await newExam.save();
        res.status(201).json(newExam);
      } catch (error) {
        console.log(error);
        
        res.status(400).json({ error: "Failed to create exam" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
