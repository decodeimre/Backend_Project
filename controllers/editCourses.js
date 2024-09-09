import {Course} from "../models/courseModel.js";

export const addCourse = async (req, res, next) => {
  try {
    const {
      name,
      category,
      weekday,
      time,
      maxParticipants,
      description,
      instructor,
    } = req.body;
    const newCourse = await Course.create({
      name,
      category,
      weekday,
      time,
      maxParticipants,
      description,
      instructor,
    });
   res.status(200).json({ msg: "Course added successfully", newCourse });
  } catch (error) {
    next(error);
  }
};


export const deleteCourse = async (req, res, next) => {
    try {
        const { courseID } = req.body;
        await Course.findByIdAndDelete(courseID);
        res.status(200).json({ msg: "Course deleted successfully" });
    } catch (error) {
        next(error);
    }
    };

export const editCourse = async (req, res, next) => {
    try {
        const { _id, name, category, weekday, time, maxParticipants, description, instructor } = req.body;
        const editedCourse = await Course.findByIdAndUpdate(_id, { name, category, weekday, time, maxParticipants, description, instructor }, { new: true });
        res.status(200).json({ msg: "Course edited successfully", editedCourse });
    } catch (error) {
        next(error);
    }
    }