// lib/middleware.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export function parseRequestBody(req: NextApiRequest): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); // Accumulate the incoming data
    });
    req.on("end", () => {
      if (body) { // Check if the body is not empty
        try {
          const json = JSON.parse(body); // Try parsing the JSON
          resolve(json);
        } catch (err) {
          reject(new Error('Failed to parse JSON body')); // Handle JSON parsing errors
        }
      } else {
        reject(new Error('Empty body')); // Handle empty body scenario
      }
    });
    req.on("error", (err) => {
      reject(err); // Handle errors that occur during reading the request stream
    });
  });
}
