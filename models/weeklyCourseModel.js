import { model, Schema } from "mongoose";

const WeeklyCourseSchema = new Schema({
  name: { type: String, required: true },
  category: { type: [String], required: true },
  weekday: { type: String, required: true },
  time: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  maxParticipants: { type: Number, required: true },
  description: String,
  instructor: { type: String, required: true }
});

export const WeeklyCourse = model("WeeklyCourse", WeeklyCourseSchema);
