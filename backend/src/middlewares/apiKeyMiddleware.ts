import { error } from "console";
import { NextFunction, Request, Response } from "express";

const API_KEY = process.env.API_KEY;

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "GET") next();
  const key = req.headers["x-api-key"];
  if (key !== API_KEY) {
    res.status(403).json({ error: "Forbidden" });
  }
  next();
};
