jest.mock("@/middlewares/validateEventData", () => ({
  validateEventData: jest.fn(),
}));
import request from "supertest";
import { app } from "@/server";
import { eventServices } from "@/services/eventServices";
import { validateEventData } from "@/middlewares/validateEventData";

describe("Event api endpoints", () => {
  test("should return events", async () => {
    const events = [
      {
        title: "Mock event",
      },
    ];
    eventServices.getEvents = jest.fn().mockResolvedValue(events);
    const response = await request(app).get("/api/events");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(events);
  });
  test("should create event", async () => {
    const event = { title: "title" };
    eventServices.createEvent = jest.fn().mockResolvedValue(event);
    (validateEventData as jest.Mock).mockImplementation(() => true);
    const response = await request(app)
      .post("/api/events")
      .set("x-api-key", process.env.API_KEY || "")
      .send(event);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(event);
  });
  test("shouldn't create event", async () => {
    const event = { title: "title" };
    const err = new Error("Forbidden");
    const response = await request(app).post("/api/events").send(event);
    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual({ error: err.message });
  });
  test("should delete event", async () => {
    const id = "2";
    const event = { title: "title" };
    eventServices.deleteEvent = jest.fn().mockResolvedValue(event);
    const response = await request(app)
      .delete(`/api/events/${id}`)
      .set("x-api-key", process.env.API_KEY || "")
      .send(id);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(event);
  });
  test("shouldn't delete event", async () => {
    const id = "2";
    const err = new Error("Forbidden");
    const response = await request(app).delete(`/api/events/${id}`).send(id);
    expect(response.statusCode).toBe(403);
    expect(response.body).toEqual({ error: err.message });
  });
});
