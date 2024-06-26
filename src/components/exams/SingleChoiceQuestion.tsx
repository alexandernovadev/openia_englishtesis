import React, { useState, useRef } from "react";
import axios from "axios";
import { Question } from "@/interfaces/Exam";

interface Props {
  question: Question;
  onChange: (option: string) => void;
  selectedAnswer: string;
  correctAnswer: string;
  isGraded: boolean;
  disabled?: boolean;
  textRefencePadre?: string;
}

const SingleChoiceQuestion = ({
  question: { title, options },
  onChange,
  selectedAnswer,
  correctAnswer,
  isGraded,
  disabled,
  textRefencePadre = ""
}: Props) => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);


  const speakWord = () => {
    const utterance = new SpeechSynthesisUtterance(correctAnswer);
    window.speechSynthesis.speak(utterance);
  };

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
          question: `${textRefencePadre.length != 0?('TEXO PADRE REFECNCIA DE LA PREGUNTA :/n/n '+ textRefencePadre+' --->'):'->  ' }  `+ title,
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

  return (
    <div className="bg-slate-700 p-4 rounded-lg my-2">
      <h2 className="text-white text-lg mb-2">{title}</h2>
      <div>
        {options?.map((option) => (
          <label
            key={option}
            className={`block mb-2 p-2 rounded-lg justify-center ${
              isGraded && option === correctAnswer
                ? "border-2 border-green-500"
                : isGraded &&
                  option === selectedAnswer &&
                  option !== correctAnswer
                ? "border-2 border-red-500"
                : ""
            }`}
          >
            <input
              type="radio"
              name={`sq-|${title}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onChange(option)}
              disabled={disabled}
              className="mr-2"
            />
            {option}
            {isGraded && option === selectedAnswer && (
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
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Obteniendo feedback..." : "Obtener Feedback"}
        </button>
      )}

      {feedback && (
        <section
          ref={feedbackRef}
          className="mt-4 bg-gray-800 p-4 rounded overflow-y-auto"
        >
          <h3 className="text-white text-lg mb-2">Feedback:</h3>
          <div
            className="text-gray-300"
            dangerouslySetInnerHTML={{ __html: feedback }}
          ></div>
        </section>
      )}
    </div>
  );
};

export default SingleChoiceQuestion;
