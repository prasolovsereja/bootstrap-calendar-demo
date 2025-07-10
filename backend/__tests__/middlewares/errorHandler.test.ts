import { errorHandler } from "@/middlewares/errorHandler";
import { HttpError } from "@/utils/HttpError";
import { Response, Request, NextFunction } from "express";

describe("Error handler tests", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const req = {} as Request;
  const next = jest.fn() as NextFunction;
  const httpError = new HttpError(400, "Invalid data");
  const error = new Error();
  test("Should return 500", () => {
    errorHandler(error, req, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
  test("Should return !500", () => {
    errorHandler(httpError, req, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid data" });
  });
});
