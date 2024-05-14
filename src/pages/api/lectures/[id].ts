// pages/api/lectures/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/dbmongoclient";
import LectureModel from "@/dbmongoclient/models/lecture";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await clientPromise; // Asegúrate de que la conexión a la base de datos esté establecida

  const { id } = req.query;

  if (req.method === "GET") {
    // Obtener una lección por ID
    try {
      const lecture = await LectureModel.findById(id);

      if (!lecture) {
        return res.status(404).json({ error: "Lecture not found" });
      }

      return res.status(200).json(lecture);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    // Actualizar una lección por ID
    const { content, level, topic } = req.body;

    if (!content || !level || !topic) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const updatedLecture = await LectureModel.findByIdAndUpdate(
        id,
        { content, level, topic, updatedAt: new Date() },
        { new: true }
      );

      if (!updatedLecture) {
        return res.status(404).json({ error: "Lecture not found" });
      }

      return res.status(200).json(updatedLecture);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
