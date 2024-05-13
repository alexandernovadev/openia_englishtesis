import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your-secret-key";

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
