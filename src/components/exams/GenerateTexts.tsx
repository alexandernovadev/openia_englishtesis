import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Para soporte adicional de Markdown

const GenerateTexts: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [topicUser, setTopicUser] = useState("");
  const [error, setError] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  const handleGenerateText = async (e:any ) => {
    e.preventDefault();
    setLoading(true);
    setText("");
    setError("");

    try {
      const response = await fetch("/api/openia/generatetexts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: topicUser || "First Revolution United Kingdom" }),
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

  const handleWordClick = (word: string) => {
    console.log(word);
  };

  const renderParagraph = (props: any) => {
    const { children } = props;
    return (
      <p>
        {React.Children.map(children, (child, index) => {
          if (typeof child === "string") {
            const words = child.split(" ");
            return words.map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                <span
                  onClick={() => handleWordClick(word)}
                  className="cursor-pointer"
                >
                  {word}
                </span>
                {wordIndex < words.length - 1 ? " " : ""}
              </React.Fragment>
            ));
          }
          return child;
        })}
      </p>
    );
  };

  const components = {
    p: renderParagraph,
  };

  return (
    <div className=" mx-auto p-4">
      <form className="flex" onSubmit={handleGenerateText}>
        <input
          type="text"
          value={topicUser}
          onChange={(e) => setTopicUser(e.target.value)}
          placeholder="Elige un tema del texto que IAtin te generará..."
          className="px-4 py-2 flex-1 mr-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        />
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
        className="mt-4 p-4 border rounded h-auto max-h-[680px] h-m overflow-y-scroll"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default GenerateTexts;
