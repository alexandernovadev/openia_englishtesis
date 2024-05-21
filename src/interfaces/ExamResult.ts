export interface ExamResult {
  resultID: string; // Identificador único del resultado del examen.
  examID: string; // Identificador del examen correspondiente.
  userID: string; // Identificador del usuario que realizó el examen.
  score: number; // Puntuación obtenida por el usuario en el examen.
  answers: UserAnswer[]; // Respuestas dadas por el usuario en cada pregunta del examen.
  createdAt?: string; // Fecha y hora en que se registró el resultado.
  updatedAt?: string; // Fecha y hora de la última actualización del resultado.
}

// UserAnswer export interface
export interface UserAnswer {
  questionID: string; // Identificador único de la pregunta.
  answer: string | string[]; // Respuesta dada por el usuario.
}


// Modelo de Retroalimentación (Feedback)
export interface Feedback {
  feedback: string | null; // Comentario o explicación proporcionada como parte de la retroalimentación.
  status: "WELLDONE" | "SO-SO" | "WRONG" | null; // Estado de la respuesta del usuario.
}