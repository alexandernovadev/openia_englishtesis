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

  const { question, options, selectedAnswer, correctAnswer } = req.body;

  const prompt = `
  Aquí está la pregunta: "<strong>${question}</strong>" con opciones: ${options
    .map((option: string) => `<li>${option}</li>`)
    .join("")}.
  La respuesta seleccionada es: "<strong>${selectedAnswer}</strong>".
  La respuesta correcta es: "<strong>${correctAnswer}</strong>".
  
  Proporciona un feedback conciso, bien estructurado y visualmente atractivo usando HTML. Incluye encabezados, texto en negrita, colores (#357a38 para correcto, #d32f2f para incorrecto), y emojis. Asegúrate de que el feedback esté bien organizado para facilitar la lectura.

  Aquí hay un ejemplo de cómo estructurar el feedback:

  <h3 style="color: #f6685e;">Lo siento, pero la respuesta seleccionada no es correcta. 😕</h3> (USA VARIEDAD DE MENSJAES y emojis)
  <h6 style="color: #FFEB3B;">AUI PON LA TRADUCCION</h6>
  <span style="color: #CFD8DC;">AQUI PON EL IPA</span>
  <p>La frase correcta es: <span style="color: #4caf50;"><strong>"I wish I had more time to finish the project."</strong></span></p>
  <p>En inglés, cuando expresamos un deseo sobre una situación que es contraria a los hechos actuales, usamos   <span style="color: #2196F3;"><b>wish</b></span>  seguido de un verbo en tiempo pasado. En este caso, <strong style="color: #2196F3;">"I had"</strong> es la forma correcta porque estás expresando un deseo sobre algo que no es cierto en el presente (no tienes más tiempo para terminar el proyecto). 🕰️</p>
  <p>Por ejemplo, si no tienes un coche pero te gustaría tener uno, dirías: <span style="color: #4caf50;"><strong>"I wish I had a car".</strong></span> 🚗</p>
  <p><strong>¡Sigue practicando y mejorarás!</strong> 📚💪</p> (ESTO LO CAMBIRAS POR EMOJIS DIFERENTES Y MENSJAES DIFENTEE)
  
  Usa esta estructura para generar el feedback para la pregunta proporcionada.
`;

  const stream = await openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: "system",
        content: prompt,
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
