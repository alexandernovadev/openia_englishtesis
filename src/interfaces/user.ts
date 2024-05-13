export interface User {
  userID: string;
  username: string;
  email: string;
  passwordHash: string;
  role: "student" | "teacher" | "administrator";
  languagePreference: string;
  createdAt?: string;
  updatedAt?: string;
}
