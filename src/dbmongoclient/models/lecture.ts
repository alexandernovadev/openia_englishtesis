import mongoose, { Schema, Document, Model } from "mongoose";

export interface Lecture extends Document {
  content: string;
  level: string;
  topic: string;
  createdAt?: Date;
  updatedAt?: Date;
  img?: string;
}

const LectureSchema: Schema = new Schema({
  content: { type: String, required: true },
  level: { type: String, required: true },
  topic: { type: String, required: true },
  img: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let LectureModel: Model<Lecture>;

try {
  LectureModel = mongoose.model<Lecture>("Lecture");
} catch (error) {
  LectureModel = mongoose.model<Lecture>("Lecture", LectureSchema);
}

export default LectureModel;
