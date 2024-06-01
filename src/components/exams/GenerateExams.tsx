import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Para soporte adicional de Markdown

interface GenerateTextsProps {
  level?: string;
  lecture?: string;
  ammountQuestions?: number;
  sendExamJSON?: (text: Object) => void;
  topicUser?: string;
  setTopicUser?: (topic: string) => void;
}

const GenerateExams = ({
  level = "B2",
  ammountQuestions = 10,
  sendExamJSON,
  lecture,
  topicUser,
  setTopicUser,
}: GenerateTextsProps) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

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
          prompt: lecture || topicUser,
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
    if (text.length > 0 && !loading) {
      convertRtaToJSON();
    }
  }, [text, loading]);

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
        {lecture ? (
          <h3 className="mx-4 cursor-pointer" title={lecture}>
            {lecture?.split("##")[0]}
          </h3>
        ) : (
          <input
            placeholder="Sobre que quieres generar el examen"
            className="px-4 py-2 flex-1 mr-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            type="text"
            value={topicUser}
            onChange={(e) => setTopicUser && setTopicUser(e.target.value)}
          />
        )}

        <button
          type="submit"
          className="px-4 py-2 w-1/6 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Exam"}
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
