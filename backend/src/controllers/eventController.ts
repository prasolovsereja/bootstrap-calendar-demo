import { eventServices } from "../services/eventServices";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";
import { validateEventData } from "../middlewares/validateEventData";

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await eventServices.getEvents();
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!validateEventData(req.body)) {
      return next(new HttpError(400, "Invalid event data"));
    }
    const event = await eventServices.createEvent(req.body);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return next(new HttpError(401, "Invalid id"));
    }
    const event = await eventServices.deleteEvent(id);
    res.status(201).json(event);
  } catch (err: any) {
    if (err.code === "P2025") {
      return next(new HttpError(404, "Not found"));
    }
    next(err);
  }
};
