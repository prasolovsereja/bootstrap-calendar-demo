import express from "express";
import cors from "cors";
import { eventRouter } from "./routes/eventRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { apiKeyMiddleware } from "./middlewares/apiKeyMiddleware";

export const app = express();
const allowedOrigins = [
  "https://prasolovsereja.github.io/",
  "https://prasolovsereja.github.io",
  "https://prasolovsereja.github.io/bootstrap-calendar-demo/",
  "https://prasolovsereja.github.io/bootstrap-calendar-demo",
  "http://localhost:5173/bootstrap-calendar-demo/",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("cors error");
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(errorHandler);
app.use(apiKeyMiddleware);
app.use("/api/events", eventRouter);
