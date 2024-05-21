import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Para soporte adicional de Markdown

interface GenerateTextsProps {
  level?: string;
  ammountQuestions?: number;
  sendExamJSON?: (text: Object) => void;
}

const GenerateExams = ({
  level = "B2",
  ammountQuestions = 10,
  sendExamJSON,
}: GenerateTextsProps) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  // This one woulb be the content of lecture
  const [topicUser, setTopicUser] = useState("");
  
  const [error, setError] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  const handleGenerateText = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setText("");
    setError("");

    try {
      const response = await fetch("/api/openia/generate-exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            topicUser ||
            `# The Beautiful Thing I've Got## A Lesson in Appreciation Once upon a time, there was a young girl named Lily. She had a beautiful doll that she loved very much. It was a gift from her grandmother and was very special to her. She took great care of it, always keeping it clean and safe. One day, a friend asked if she could borrow the doll. Lily was hesitant. She didn't want to risk losing or damaging this beautiful thing she had. She kindly refused, explaining how important the doll was to her. From that day on, Lily learned the importance of appreciating and protecting the things we love.`,
          level,
          ammountQuestions,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader!.read();
        done = streamDone;
        const chunk = decoder.decode(value, { stream: true });
        setText((prevText) => {
          const newText = prevText + chunk;
          return newText;
        });
        if (textRef.current) {
          textRef.current.scrollTop = textRef.current.scrollHeight;
        }
      }
    } catch (err) {
      setError("Failed to fetch the generated text.");
    } finally {
      setLoading(false);

    }
  };

  useEffect(() => {
    if (text.length >0 && !loading) {
      convertRtaToJSON()
    }
  }, [text, loading])
  
  const convertRtaToJSON = () => {
    // Eliminar las partes "```json" y "```"
    let texDt = text
      .replace(/```json/, "")
      .replace(/```/, "")
      .trim();
    // Parsear el JSON a un objeto JavaScript
    const parsedObject = JSON.parse(texDt);

    sendExamJSON && sendExamJSON(parsedObject);
  };

  return (
    <div className="mx-auto p-4">
      <form className="flex" onSubmit={handleGenerateText}>
        <h3 className="mx-4">
          Lecture (Send my moon to the sun and dream about it)
        </h3>

        <button
          type="submit"
          className="px-4 py-2 w-1/6 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Text"}
        </button>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      <div
        ref={textRef}
        className="mt-4 p-4 border rounded h-auto max-h-[620px] h-m overflow-y-scroll"
      >
        {text.length === 0 && (
          <div className="text-center text-gray-400">
            No text generated yet.
          </div>
        )}

        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default GenerateExams;
