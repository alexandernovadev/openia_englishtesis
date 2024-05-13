// src/utils/cookies.ts
import { NextApiRequest, NextApiResponse } from "next";
import { parse, serialize } from "cookie";
import { IncomingMessage } from "http";

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options: any = {}
) => {
  const stringValue =
    typeof value === "object" ? `j:${JSON.stringify(value)}` : String(value);
  if (options.maxAge) {
    options.expires = new Date(Date.now() + options.maxAge * 1000);
  }
  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

export const getCookie = (req: IncomingMessage, name: string) => {
  const cookies = parse(req.headers.cookie || "");
  return cookies[name];
};
