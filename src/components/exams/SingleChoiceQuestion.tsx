import React from "react";
import { AlertsResponse } from "./AlertsResponse";
import { Question } from "@/interfaces/Exam";

interface Props {
  question: Question;
  onChange: (option: string) => void;
}

const SingleChoiceQuestion = ({
  question: { title, correctAnswer, options },
  onChange,
}: Props) => {
  return (
    <div className="bg-slate-700 p-4 rounded-lg my-2">
      <h2 className="text-white text-lg mb-2">{title}</h2>
      <div>
        {options?.map((option) => (
          <label key={option} className="block mb-2">
            <input
              type="radio"
              name={`sq-|${title}`}
              value={option}
              onChange={() => onChange(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SingleChoiceQuestion;
