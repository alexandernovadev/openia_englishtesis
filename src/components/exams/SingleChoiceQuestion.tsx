import React from "react";
import { Question } from "@/interfaces/Exam";

interface Props {
  question: Question;
  onChange: (option: string) => void;
  selectedAnswer: string;
  correctAnswer: string;
  isGraded: boolean;
  disabled?: boolean;
}

const SingleChoiceQuestion = ({
  question: { title, options },
  onChange,
  selectedAnswer,
  correctAnswer,
  isGraded,
  disabled,
}: Props) => {
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
            {isGraded && option === selectedAnswer && <span className="mx-4 text-sm font-bold text-yellow-600">TU SELECCION</span>}

          </label>
          
        ))}
      </div>
    </div>
  );
};

export default SingleChoiceQuestion;
