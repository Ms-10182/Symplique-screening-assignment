import { getUpcomingReminders, setReminder } from "../controllers/reminder.controller.js";
import { Router } from "express";

const router = Router()

router.route("/").get(getUpcomingReminders).post(setReminder)

export default router