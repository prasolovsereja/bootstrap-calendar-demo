import express from "express";
import cors from "cors";
import { eventRouter } from "./routes/eventRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { apiKeyMiddleware } from "./middlewares/apiKeyMiddleware";

const app = express();
const allowedOrigins = [
  "https://prasolovsereja.github.io/bootstrap-calendar-demo/",
  "http://localhost:5173/bootstrap-calendar-demo/",
];
app.use(express.json());
app.use("/api/events", eventRouter);
app.use(errorHandler);
app.use(apiKeyMiddleware);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
