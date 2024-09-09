import { verifyToken } from "../utils/token.js";
import {User} from "../models/userModel.js";
import {Course} from "../models/courseModel.js";

export const bookNewCourse = async (req, res, next) => {
  try {
    const token = req.cookies.Le_Toquen;
    const isVerified = await verifyToken(token, process.env.SECRET_KEY);
    if (!isVerified) {
      return res.status(401).json({ msg: "no valid token found" });
    }
    const { courseID } = req.params;
    if (!courseID) {
      return res.status(400).json({ msg: "No course ID found" });
    }

    console.log(isVerified);

    //check if course is already booked
    const user = await User.findById(isVerified.userID);
    const courseAlreadyBooked = user.bookedCourses.includes(courseID);
    if(courseAlreadyBooked){
      return res.status(400).json({ msg: "You already booked that course" });
    }

    //check if course is full
    const course = await Course.findById(courseID);
    if(course.participants.length === course.maxParticipants){
      return res.status(400).json({ msg: "Sorry, this course is full" });
    }

    //add course id to user's bookedCourses array
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $push: { bookedCourses: courseID } },
      { new: true }
    );

    //add user id to course's participants array
    const updatedCourse = await Course.findByIdAndUpdate(
      courseID,
      { $push: { participants: user._id } },
      { new: true }
    );


    const userObj = updatedUser.toObject();
    delete userObj.password;
    delete userObj.__v;

    res.status(200).json({ msg: "Course booked", updatedUser: userObj, updatedCourse });
  } catch (error) {
    next(error);
  }
};



export const deleteBookedCourse = async (req, res, next) => {
    try {
        const token = req.cookies.Le_Toquen;
        const isVerified = await verifyToken(token, process.env.SECRET_KEY);
        if (!isVerified) {
        return res.status(401).json({ msg: "no valid token found" });
        }
        const { courseID } = req.params;
        if (!courseID) {
        return res.status(400).json({ msg: "No course ID found" });
        }
    
        //check if course is booked
        const user = await User.findById(isVerified.userID);
        const courseIsBooked = user.bookedCourses.includes(courseID);
        if(!courseIsBooked){
        return res.status(400).json({ msg: "You have not booked that course" });
        }
    
        //remove course id from user's bookedCourses array
        const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $pull: { bookedCourses: courseID } },
        { new: true }
        );
    
        //remove user id from course's participants array
        const updatedCourse = await Course.findByIdAndUpdate(
        courseID,
        { $pull: { participants: user._id } },
        { new: true }
        );
    
        const userObj = updatedUser.toObject();
        delete userObj.password;
        delete userObj.__v;
    
        res.status(200).json({ msg: "Course booking deleted", updatedUser: userObj, updatedCourse });
    } catch (error) {
        next(error);
    }
}