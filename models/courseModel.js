import mongoose, { model, Schema } from "mongoose";

const CourseSchema = new Schema({
  name: { type: String, required: true },
  category: { type: [String], required: true },
  weekday: { type: String, required: true },
  date: { type: Date, required: true },
  time: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  maxParticipants: { type: Number, required: true },
  description: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const Course = model("Course", CourseSchema);
