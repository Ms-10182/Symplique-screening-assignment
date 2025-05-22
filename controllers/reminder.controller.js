import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Reminder } from "../models/reminder.model.js";

const formatCheck = (date, time) => {
  const isValidDate = new Date(`${date}T${time}`);
  if (isValidDate.toDateString() === "Invalid Date") {
    return false;
  } else {
    return true;
  }
};

const setReminder = asynchandler(async (req, res) => {
  // console.log(req)
  const { date, time, message, reminderType } = req.body;
  if (
    [date, time, message, reminderType].some(
      (item) => !item || item.trim() === ""
    )
  ) {
    throw new ApiError(400, "all fields are required");
  }
  if (!formatCheck(date, time)) {
    throw new ApiError(400, "invalid date or time format");
  }
  const reminderDate = new Date(`${date}T${time}`)

  if (!reminderType || !["email", "sms"].includes(reminderType)) {
    throw new ApiError(400, "invalid reminder type");
  }

  const reminder = await Reminder.create({
    date:reminderDate,
    message: message || "",
    reminderType,
  });

  if (!reminder) {
    throw new ApiError(500, "failed to create a reminder");
  }

  res
    .status(200)
    .json(new ApiResponse(201, reminder, "reminder created successfully"));
});

const getUpcomingReminders = asynchandler(async (req, res) => {
  const { date, time } = req.body;
  if ([date, time].some((item) => !item || item.trim() === "")) {
    throw new ApiError(400, "both date and time are required");
  }

  if (!formatCheck(date, time)) {
    throw new ApiError(400, "invalid date or time format");
  }

  const reminderDate = new Date(`${date}T${time}`)
  const reminders = await Reminder.find({
    date:{$gte:reminderDate}
  })

  if(!reminders){
    throw new ApiError(404,"no reminders found")
  }
  res.status(200).json(new ApiResponse(200,reminders,"reminders fetched successfully"))
});
export { setReminder,getUpcomingReminders };
