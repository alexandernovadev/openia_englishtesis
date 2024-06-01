// Modelo de Examen (Exam)
export interface Exam {
  _id?: string;
  lectureID: string;
  title: string;
  difficulty: "HARD" | "MEDIUM" | "EASY";
  level: "A1" | "A2" | "B1" | "B1+" | "B2" | "C1" | "C2";
  score: number;
  questions: Question[];
  createdAt?: string;
  updatedAt?: string;
}

// Modelo de Pregunta (Question)
export interface Question {
  _id: string;
  title: string;
  type: "MULTIPLE" | "UNIQUE" | "OPENTEXT";
  options?: string[];
  correctAnswer: string;
  validations?: Validations;
}

// Modelo de Validaciones (Validations)
export interface Validations {
  required?: boolean;
  max?: number;
  min?: number;
}
