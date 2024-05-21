// models/User.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface User extends Document {
  userID: string;
  username: string;
  email: string;
  passwordHash: string;
  role: "student" | "teacher" | "administrator";
  languagePreference: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema({
  userID: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "teacher", "administrator"],
    required: true,
  },
  languagePreference: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let UserModel: Model<User>;

try {
  UserModel = mongoose.model<User>("User");
} catch (error) {
  UserModel = mongoose.model<User>("User", UserSchema);
}

export default UserModel;
