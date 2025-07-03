import express from "express";
import { eventRouter } from "./routes/eventRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use("/api/events", eventRouter);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
