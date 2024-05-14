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

  const { prompt, level, paragraphs } = req.body;

  const stream = await openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: "system",
        content: `
        Create a history text about '${prompt}'. This text is for learning English, using vocabulary at the ${level} level and consisting of ${paragraphs} paragraphs.

        Instructions:
        1) The entire text must be in English.
        2) Format the text in Markdown.
        3) Use the following format:
          # Title
          ## Subtitle
          
          Paragraph 1
          Paragraph 2
          Paragraph 3
          ...
          
          (The text should have ${paragraphs} paragraphs, each with a minimum of 96 words, excluding the title and subtitle)
        `,
      },
    ],
    model: "gpt-4",
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
