import React, { useState, useRef } from "react";
import Markdown from "react-markdown";

const GenerateTexts: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  const handleGenerateText = async () => {
    setLoading(true);
    setText("");
    setError("");

    try {
      const response = await fetch("/api/openia/generatetexts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "World War I" }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader!.read();
        done = streamDone;
        const chunk = decoder.decode(value, { stream: true });
        setText((prevText) => prevText + chunk);
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={handleGenerateText}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Text"}
      </button>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      <div
        ref={textRef}
        className="mt-4 p-4 border rounded h-64 overflow-y-auto"
      >
        {text.split("\n").map((line, index) => (
          <Markdown key={index}>{line}</Markdown>
        ))}
      </div>
    </div>
  );
};

export default GenerateTexts;
