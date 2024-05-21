import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { ExamModel } from '@/dbmongoclient/models/exam';
import clientPromise from '@/dbmongoclient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.query;
  await clientPromise; // Asegúrate de que la conexión a la base de datos esté establecida

  switch (req.method) {
    case 'GET':
      try {
        const exam = await ExamModel.findById(id);
        if (!exam) {
          return res.status(404).json({ error: 'Exam not found' });
        }
        res.status(200).json(exam);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exam' });
      }
      break;
    
    case 'PUT':
      try {
        const updatedExam = await ExamModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedExam) {
          return res.status(404).json({ error: 'Exam not found' });
        }
        res.status(200).json(updatedExam);
      } catch (error) {
        res.status(400).json({ error: 'Failed to update exam' });
      }
      break;

    case 'DELETE':
      try {
        const deletedExam = await ExamModel.findByIdAndDelete(id);
        if (!deletedExam) {
          return res.status(404).json({ error: 'Exam not found' });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete exam' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
