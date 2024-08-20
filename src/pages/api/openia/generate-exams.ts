import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// @ts-ignore
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { prompt, level, ammountQuestions, difficultyExam } = req.body;

  const detailedPrompt = `
  Given the user prompt: "${prompt}", you need to create an English grammar exam to evaluate the user's grammar skills.
  Consider the user's proficiency level: 
  ${level} and the specified difficulties: ${String(difficultyExam)} of (HARD, Midle, easy).
  You should act as an advanced English teacher, ensuring coherence in the questions, options, and correct answers.

  The output should be in JSON format and include ${ammountQuestions} questions. 
  Additionally, create a coherent and creative title for the exam that matches the content and level.

  Example output: 

  {
    "title": "Creative and Coherent Exam Title",
    "questions": [
      {
        "title": "Question statement",
        "type": "MULTIPLE" | "UNIQUE",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": "Correct Option"
      }
    ]
  }

  Please make sure:
  1. Each question and its options are coherent and accurate.
  2. Do not include duplicated questions or answers.
  3. Verify that the correct answer is logically consistent with the question.

  Extra Info:
  Model of a Question (Question):
  export interface Question {
    title: string; // Question statement.
    type: "MULTIPLE" | "UNIQUE"; // Type of question.
    options?: string[]; // Available options for the question.
    correctAnswer: string; // Correct answer to the question.
  }

  Do not include ' '''json' in the response.

  Ensure each question has unique and distinct options, 
  and the correct answer is precise and accurate.

  Please be creative with each ansser We need variety
  Try to use unique and multiple intercaladas 
  `;

  const stream = await openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: "system",
        content: detailedPrompt,
      },
    ],
    model: "gpt-4o",
    temperature: 0.3,
  });

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader("Transfer-Encoding", "chunked");
  res.status(200);

  for await (const chunk of stream) {
    const piece = chunk.choices[0].delta.content || "";
    res.write(piece);
  }

  res.end();
}
