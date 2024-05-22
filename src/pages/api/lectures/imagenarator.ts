import type { NextApiRequest, NextApiResponse } from "next";
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

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ message: "Prompt is required" });
    return;
  }

  try {
    const response = await openai.images.generate({
      prompt:"Generate one image to put like a portait of Book, this related to"+prompt+ " be creative and artitic",
      n: 1,
      size: "256x256",
      response_format: "b64_json",
    });

    const image = response.data[0].b64_json;
    res.status(200).json({ image });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
