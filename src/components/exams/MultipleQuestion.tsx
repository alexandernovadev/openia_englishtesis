import React from "react";

import { AlertsResponse } from "./AlertsResponse";
import { Question } from "@/interfaces/Exam";

interface Props {
  question: Question;
  onChange: (option: string | string[]) => void;
}

const MultipleChoiceQuestion = ({
  question: { title, options },
  onChange,
}: Props) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

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
          <label key={option} className="block mb-2">
            <input
              type="checkbox"
              value={option}
              onChange={() => handleOptionChange(option)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
