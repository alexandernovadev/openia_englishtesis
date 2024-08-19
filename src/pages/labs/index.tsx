import React, { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layouts/DashBoardLayout";
import { defaultPlaceholderGod } from './data'

// Deprecated
const GenerateExams: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [level, setLevel] = useState<string>("A1");
  const [ammountQuestions, setAmmountQuestions] = useState<number>(5);
  const [difficultyExam, setDifficultyExam] = useState<string>("Easy");
  const [text, setText] = useState<string>("");
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setGeneratedPrompt(defaultPlaceholderGod(prompt.toString(), level, ammountQuestions.toString(), difficultyExam));
  }, [prompt, level, ammountQuestions, difficultyExam]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/openia/generate-exams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        godpromt: generatedPrompt,
        prompt,
        level,
        ammountQuestions,
        difficultyExam,
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
  };

  return (
    <DashboardLayout>
      <div className="dark:bg-zinc-900 dark:text-zinc-100 h-[100%] p-4 overflow-scroll">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">
              USER que quiere tematica:
              <textarea
                className="w-full mt-1 p-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-100 dark:focus:ring-zinc-500"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="block">
              Level:
              <select
                className="w-full mt-1 p-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-100 dark:focus:ring-zinc-500"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block">
              Amount of Questions:
              <input
                type="number"
                className="w-full mt-1 p-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-100 dark:focus:ring-zinc-500"
                value={ammountQuestions}
                onChange={(e) => setAmmountQuestions(Number(e.target.value))}
              />
            </label>
          </div>
          <div>
            <label className="block">
              Difficulty:
              <select
                className="w-full mt-1 p-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-100 dark:focus:ring-zinc-500"
                value={difficultyExam}
                onChange={(e) => setDifficultyExam(e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:focus:ring-blue-600"
          >
            Generate Exams
          </button>
        </form>
        <div className="mt-4">
          <label className="block">
            Generated Prompt:
            <textarea
              ref={textRef}
              className="w-full h-32 p-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-100 dark:focus:ring-zinc-500"
              value={generatedPrompt}
              readOnly
            />
          </label>
        </div>
        <div className="mt-4">
          <label className="block">
            Generated Exam Text:
            <textarea
              ref={textRef}
              className="w-full h-64 p-2 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-zinc-100 dark:focus:ring-zinc-500"
              value={text}
              readOnly
            />
          </label>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GenerateExams;
