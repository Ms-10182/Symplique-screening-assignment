import express, { urlencoded } from "express";
import cors from "cors";
const app = express();

app.use(cors({
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true }));

import ReminderRoute from "./routes/reminder.route.js";
app.use("/api/v1/reminder", ReminderRoute);

export { app };
