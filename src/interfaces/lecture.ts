export interface Lecture {
  _id: string;
  content: string;
  level: string;
  topic: string;
  createdAt?: Date;
  updatedAt?: Date;
  img?: string;
}