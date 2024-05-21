import React from "react";
import { Question } from "@/interfaces/Exam";

interface Props {
  question: Question;
  onChange: (option: string | string[]) => void;
  selectedAnswer: string[];
  correctAnswer: string[];
  isGraded: boolean;
  disabled?: boolean;
}

const MultipleChoiceQuestion = ({
  question: { title, options },
  onChange,
  selectedAnswer = [],
  correctAnswer = [],
  isGraded,
  disabled,
}: Props) => {
  const [selectedOptions, setSelectedOptions] =
    React.useState<string[]>(selectedAnswer);

  const handleOptionChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((so) => so !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg my-2">
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
    </div>
  );
};

export default MultipleChoiceQuestion;
