import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
