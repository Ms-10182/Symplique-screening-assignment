import { getUpcomingReminders, setReminder } from "../controllers/reminder.controller.js";
import { Router } from "express";

const router = Router()

router.route("/").post(setReminder)
router.route("/:date/:time").get(getUpcomingReminders)

export default router