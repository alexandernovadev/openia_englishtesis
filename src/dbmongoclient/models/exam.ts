import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Question
export interface Question extends Document {
  title: string;
  type: "MULTIPLE" | "UNIQUE" | "OPENTEXT";
  options?: string[];
  correctAnswer: string;
  validations?: {}; // If you have specific validations, replace with an appropriate interface
}

// Interface for Exam
export interface Exam extends Document {
  lectureID: string;
  title: string;
  difficulty: "HARD" | "MEDIUM" | "EASY";
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  score: number;
  questions: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema for Question
const QuestionSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["MULTIPLE", "UNIQUE", "OPENTEXT"],
  },
  options: { type: [String] },
  correctAnswer: { type: String, required: true },
  validations: { type: Schema.Types.Mixed },
});

// Schema for Exam
const ExamSchema: Schema = new Schema({
  lectureID: { type: Schema.Types.ObjectId, ref: "Lecture" },
  title: { type: String, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ["HARD", "MEDIUM", "EASY"],
  },
  level: {
    type: String,
    required: true,
    enum: ["A1", "A2", "B1", "B1+", "B2", "C1", "C2"],
  },
  score: { type: Number, required: true },
  questions: { type: [QuestionSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Models
let QuestionModel: Model<Question>;

try {
  QuestionModel = mongoose.model<Question>("Question");
} catch (error) {
  QuestionModel = mongoose.model<Question>("Question", QuestionSchema);
}

let ExamModel: Model<Exam>;

try {
  ExamModel = mongoose.model<Exam>("Exam");
} catch (error) {
  ExamModel = mongoose.model<Exam>("Exam", ExamSchema);
}

export { QuestionModel, ExamModel };
