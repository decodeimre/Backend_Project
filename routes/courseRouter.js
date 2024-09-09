import { Router } from "express";
import { protectRoute } from "../utils/protectRoute.js";
import {
  addCourse,
  deleteCourse,
  editCourse,
} from "../controllers/editCourses.js";

export const courseRouter = Router();

courseRouter.route("/deleteCourse").delete(protectRoute, deleteCourse);
courseRouter.route("/addNewCourse").post(protectRoute, addCourse);
courseRouter.route("/editCourse").put(protectRoute, editCourse);
