import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// @ts-ignore
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { prompt } = req.body;
  
  const stream = await openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: 'system',
        content: `
        Make a title, a subtitle and 3 paragraphs(without titles or subtitles) about '${prompt}'.
        1 ALL TEXT must be in english .
        2in format markdown
      `,
      },
    ],
    model: 'gpt-3.5-turbo-16k-0613',
    temperature: 0.3,
  });

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.status(200);

  for await (const chunk of stream) {
    const piece = chunk.choices[0].delta.content || '';
    res.write(piece);
  }

  res.end();
}
