import { eventServices } from "../services/eventServices";
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/HttpError";
export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await eventServices.getEvents();
    console.log("Events request");
    res.json(events);
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
      return next(new HttpError(400, "Invalid ID"));
    }
    const event = await eventServices.deleteEvent(id);
    res.json(event);
  } catch (err) {
    next(err);
  }
};
