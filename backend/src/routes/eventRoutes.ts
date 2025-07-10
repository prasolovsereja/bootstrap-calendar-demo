import { Router } from "express";
import {
  deleteEvent,
  createEvent,
  getEvents,
} from "../controllers/eventController";

export const eventRouter = Router();

eventRouter.get("/", getEvents);
eventRouter.post("/", createEvent);
eventRouter.delete("/:id", deleteEvent);
