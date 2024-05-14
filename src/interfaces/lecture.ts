export interface Lecture {
  _id: string;
  lectureID: string;
  content: string;
  level: string;
  topic: string;
  createdAt?: Date;
  updatedAt?: Date;
}