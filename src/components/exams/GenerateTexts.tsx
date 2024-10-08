import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Para soporte adicional de Markdown

interface GenerateTextsProps {
  level?: string;
  generatedImage?: string;
  paragraphs?: number;
  setTopicUserDB?: (text: string) => void;
  onTextUpdate?: (text: string) => void;
  setGeneratedImage?: (text: string) => void;
}

const GenerateTexts = ({
  level = "B2",
  setTopicUserDB,
  paragraphs = 1,
  generatedImage,
  onTextUpdate,
  setGeneratedImage,
}: GenerateTextsProps) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [topicUser, setTopicUser] = useState("");
  const [error, setError] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  const handleGenerateText = async (e: any) => {
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
        body: JSON.stringify({
          prompt: topicUser || "First Revolution United Kingdom",
          level,
          paragraphs,
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
      genrateImageGpt()
    }
  };

  const genrateImageGpt = async () => {
    const imgResponse = await axios.post("/api/lectures/imagenarator", {
      prompt: topicUser,
    });
    const img = imgResponse.data.image;
    console.log("Generated image:", img);
    setGeneratedImage && setGeneratedImage(img);
  };

  // useEffect(() => {
  //   if (text.length == 100) {
  //     genrateImageGpt();
  //   }
  // }, [text]);

  useEffect(() => {
    if (onTextUpdate) {
      onTextUpdate(text);
    }
  }, [text, onTextUpdate]);

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
    <div className="mx-auto p-4">
      <form className="flex" onSubmit={handleGenerateText}>
        <input
          type="text"
          value={topicUser}
          onChange={(e) => {
            setTopicUser(e.target.value);
            setTopicUserDB && setTopicUserDB(e.target.value);
          }}
          placeholder="Elige un tema del texto que IAtin te generará..."
          className="px-4 py-2 flex-1 mr-4 border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-700 text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 w-1/6 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-zinc-300"
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
          <div className="text-center text-zinc-400">
            No text generated yet.
          </div>
        )}
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default GenerateTexts;
