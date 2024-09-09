import { Router } from "express";
import { loginValidation, registerValidation } from "../utils/validation/userValidation.js";
import { handleValidationResults } from "../utils/validation/handleValidationResults.js";
import {register, login} from '../controllers/registerLogin.js'
import { bookNewCourse,deleteBookedCourse } from "../controllers/courseBooking.js";


export const userRouter = Router();

userRouter.route('/register').post(registerValidation, handleValidationResults, register);
userRouter.route('/login').post(loginValidation, handleValidationResults, login);
userRouter.route('/courses/:courseID/booking').post(bookNewCourse).delete(deleteBookedCourse);
