// pages/api/generate.ts
import { parseRequestBody } from "@/libs/middlewareOpenIa";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

interface Options {
  prompt: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de tener tu API Key en las variables de entorno
});

export const config = {
  api: {
    bodyParser: false, // Deshabilitar el análisis automático del cuerpo de la solicitud
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const options: Options = await parseRequestBody(req);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const stream = await openai.chat.completions.create({
      stream: true,
      messages: [
        {
          role: "system",
          content: `
          Dame un text en ingles b2 sobre la segunda geuerra mundial, 
          tendra un title un subtitulo y un parrafo de 200 palabras
        `,
        },
        { role: "user", content: options.prompt },
      ],
      model: "gpt-3.5-turbo-1106",
      temperature: 0.3,
    });

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }

    res.end();
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: "Error generating text" });
  }
};
