import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const logoutHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  res.setHeader(
    "Set-Cookie",
    serialize("auth", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1, // Expirate it inmediatly
      path: "/",
    })
  );

  return res.status(200).json({ message: "Logout successful" });
};

export default logoutHandler;
