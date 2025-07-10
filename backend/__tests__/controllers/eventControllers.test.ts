jest.mock("@/middlewares/validateEventData", () => ({
  validateEventData: jest.fn(),
}));
import { Response, Request, NextFunction } from "express";
import { eventServices } from "@/services/eventServices";
import {
  getEvents,
  createEvent,
  deleteEvent,
} from "@/controllers/eventController";
import { validateEventData } from "@/middlewares/validateEventData";
import { HttpError } from "@/utils/HttpError";

describe("Event controllers test", () => {
  let res: Partial<Response>;
  let next: NextFunction;
  beforeEach(() => {
    next = jest.fn();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });
  test("Get events should success", async () => {
    const req = {} as Request;
    eventServices.getEvents = jest.fn().mockResolvedValue([]);
    await getEvents(req, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });
  test("Get events should reject", async () => {
    const req = {} as Request;
    const error = new Error("error");
    eventServices.getEvents = jest.fn().mockRejectedValue(error);
    await getEvents(req, res as Response, next);
    expect(next).toHaveBeenCalledWith(error);
  });
  test("Create events should end with success", async () => {
    const req = { body: { title: "title" } } as Request;
    (validateEventData as jest.Mock).mockImplementation(() => true);
    eventServices.createEvent = jest.fn().mockResolvedValue(req.body);
    await createEvent(req, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
  test("Create events should end with validation error", async () => {
    const req = { body: { title: "title" } } as Request;
    const error = new HttpError(400, "invalid data");
    (validateEventData as jest.Mock).mockImplementation(() => next(error));
    await createEvent(req, res as Response, next);
    expect(next).toHaveBeenCalledWith(error);
  });
  test("Create events should reject", async () => {
    const req = { body: { title: "title" } } as Request;
    const error = new Error("error");
    (validateEventData as jest.Mock).mockImplementation(() => true);
    eventServices.createEvent = jest.fn().mockRejectedValue(error);
    await createEvent(req, res as Response, next);
    expect(next).toHaveBeenCalledWith(error);
  });
  test("Delete events should end with success", async () => {
    const req = {
      body: { title: "title" },
      params: { id: "2" },
    } as Partial<Request>;
    eventServices.deleteEvent = jest.fn().mockResolvedValue(req.body);
    await deleteEvent(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });
  test("Delete events should end with invalid id", async () => {
    const req = {
      body: { title: "title" },
      params: { id: "two" },
    } as Partial<Request>;
    const error = new HttpError(401, "Invalid id");
    await deleteEvent(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(error);
  });
  test("Delete events should end with not found error", async () => {
    const req = {
      body: { title: "title" },
      params: { id: "2" },
    } as Partial<Request>;
    const err = {
      code: "P2025",
    };
    const nextErr = new HttpError(404, "Not found");
    eventServices.deleteEvent = jest.fn().mockRejectedValue(err);
    await deleteEvent(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(nextErr);
  });
  test("Delete events should end with 500 error", async () => {
    const req = {
      body: { title: "title" },
      params: { id: "2" },
    } as Partial<Request>;
    const err = new Error("Error");
    eventServices.deleteEvent = jest.fn().mockRejectedValue(err);
    await deleteEvent(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledWith(err);
  });
});
