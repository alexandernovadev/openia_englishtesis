export const defaultPlaceholderGod = (
  prompt: string,
  level: string,
  ammountQuestions: string,
  difficultyExam: string
) => {
  return `
Given the user prompt: "${prompt}", you need to create an English exam to evaluate the user's reading comprehension skills.
Consider the user's proficiency level: ${level} and the specified difficulties: ${String(
    difficultyExam
  )} of (HARD, Midle, easy).
You should act as an advanced English teacher, ensuring coherence in the questions, options, and correct answers.

The output should be in JSON format and include ${ammountQuestions} questions. Additionally, create a coherent and creative title for the exam that matches the content and level.

Example output: 

{
  "title": "Creative and Coherent Exam Title",
  "questions": [
    {
      "title": "Question statement",
      "type": "MULTIPLE" | "UNIQUE",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Correct Option"
    }
  ]
}

Please make sure:
1. Each question and its options are coherent and accurate.
2. Do not include duplicated questions or answers.
3. Verify that the correct answer is logically consistent with the question.

Extra Info:
Model of a Question (Question):
export interface Question {
  title: string; // Question statement.
  type: "MULTIPLE" | "UNIQUE"; // Type of question.
  options?: string[]; // Available options for the question.
  correctAnswer: string; // Correct answer to the question.
}

Do not include ' '''json' in the response.

Ensure each question has unique and distinct options, and the correct answer is precise and accurate.
`;
};
