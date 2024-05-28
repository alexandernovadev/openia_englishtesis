import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt input is required" });
    }

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: prompt,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Generate a unique filename using UUID
    const speechFileName = `speech-${uuidv4()}.mp3`;
    const speechFilePath = path.resolve("./public", speechFileName);

    await fs.promises.writeFile(speechFilePath, buffer);

    // Provide a URL to download the generated speech file
    const downloadUrl = `${req.headers.origin}/${speechFileName}`;

    res
      .status(200)
      .json({ message: "Speech generated successfully", downloadUrl });
  } catch (error) {
    console.error("Failed to generate speech:", error);
    res.status(500).json({ error: "Failed to generate speech" });
  }
}
