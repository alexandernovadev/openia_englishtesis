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

  const { prompt, level, ammountQuestions,difficultyExam } = req.body;

  console.log({level,ammountQuestions});
  
  const difficulty = ["HARD", "MEDIUM", "EASY"];
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];

  const stream = await openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: "system",
        content: `
        Con base a este prompt del USER "${prompt}", deberas crear un examen en ingles,para evaluar su compresion lectora 
        Debes de responder en formato JSON, debera tener en cuanta el level :${level} del use  y de las difucultades ${String(difficulty)} usaras esta "${difficulty[2]}"
        Deberas actuar como un docente avanzado de ingles, para tener coherencia con la preguntas y la opciones y la(s) correcta(S)
        
       
        Ejemplo de salida: 
    
        {
          title: string; // Título del examen.
          questions: Question[]; // Lista de preguntas incluidas en el examen. SOLLO PONER ${ammountQuestions} PREGUNTAS
        }

        
        ____INFO EXTRA_____
        // Modelo de Pregunta (Question)
        export interface Question {
          title: string; // Enunciado de la pregunta.
          type: "MULTIPLE" | "UNIQUE"  // Tipo de pregunta.
          options?: string[]; // Opciones disponibles para responder.
          correctAnswer: string; // Respuesta correcta a la pregunta.
        }
        
        `,
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
