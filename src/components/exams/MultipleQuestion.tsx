import React, { useRef, useState } from "react";
import { Question } from "@/interfaces/Exam";

interface Props {
  question: Question;
  onChange: (option: string | string[]) => void;
  selectedAnswer: string[];
  correctAnswer: string[];
  isGraded: boolean;
  disabled?: boolean;
  textRefencePadre?: string;
}

const MultipleChoiceQuestion = ({
  question: { title, options },
  onChange,
  selectedAnswer = [],
  correctAnswer = [],
  isGraded,
  disabled,
  textRefencePadre = "",
}: Props) => {
  const [selectedOptions, setSelectedOptions] =
    React.useState<string[]>(selectedAnswer);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFeedback = async () => {
    setLoading(true);
    setFeedback("");

    try {
      const response = await fetch("/api/openia/get-feedback-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question:
            `${
              textRefencePadre.length != 0
                ? "TEXO PADRE REFECNCIA DE LA PREGUNTA :/n/n " +
                  textRefencePadre +
                  " --->"
                : "->  "
            }  ` + title,
          options,
          selectedAnswer,
          correctAnswer,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader!.read();
        done = streamDone;
        const chunk = decoder.decode(value, { stream: true });
        setFeedback((prevFeedback) => {
          const newFeedback = prevFeedback + chunk;
          return newFeedback;
        });
        if (feedbackRef.current) {
          feedbackRef.current.scrollTop = feedbackRef.current.scrollHeight;
        }
      }
    } catch (err) {
      setFeedback("Failed to fetch feedback.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((so) => so !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className="bg-zinc-700 p-4 rounded-lg my-2">
      <h2 className="text-white text-lg mb-2">{title}</h2>
      <div>
        {options?.map((option) => (
          <label
            key={option}
            className={`block mb-2 p-2 rounded-lg ${
              isGraded && correctAnswer.includes(option)
                ? "border-2 border-green-500"
                : isGraded &&
                  selectedOptions.includes(option) &&
                  !correctAnswer.includes(option)
                ? "border-2 border-red-500"
                : ""
            }`}
          >
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
              disabled={disabled}
              className="mr-2"
            />
            {option}
            {isGraded && selectedOptions.includes(option) && (
              <span className="mx-4 text-xs underline font-bold text-yellow-600">
                TU SELECCION
              </span>
            )}
          </label>
        ))}
      </div>
      {isGraded && (
        <button
          onClick={handleFeedback}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-zinc-300"
          disabled={loading}
        >
          {loading ? "Obteniendo feedback..." : "Obtener Feedback"}
        </button>
      )}
      {feedback && (
        <section
          ref={feedbackRef}
          className="mt-4 bg-zinc-800 p-4 rounded overflow-y-auto"
        >
          <h3 className="text-white text-lg mb-2">Feedback:</h3>
          <div
            className="text-zinc-300"
            dangerouslySetInnerHTML={{ __html: feedback }}
          ></div>
        </section>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
