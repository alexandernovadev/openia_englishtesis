import mongoose, { Schema, Document, Model } from "mongoose";

export interface Lecture extends Document {
  lectureID: string;
  content: string;
  level: string;
  topic: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const LectureSchema: Schema = new Schema({
  lectureID: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  level: { type: String, required: true },
  topic: { type: String, required: true },
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
