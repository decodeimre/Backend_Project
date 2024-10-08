import { Course } from "../models/courseModel.js";
import { WeeklyCourse } from "../models/weeklyCourseModel.js";





export const createWeeklyCourses = async () => {
  //get all course templates
  const allCourses = await WeeklyCourse.find();


  //get the current date
const today = new Date();

  //get the date for the week after next week

  //set to run on sunday - (0) = 8 days til monday
  const daysUntilNextMonday = 8 - today.getDay();
  console.log('daysUntilNextMonday:', daysUntilNextMonday)
  const startOfNextNextWeek = new Date();
  startOfNextNextWeek.setDate(today.getDate() + daysUntilNextMonday + 7);
  console.log('startOfNextNextWeek:', startOfNextNextWeek)

  //create weekly courses for the week after next week
 const weeklyCourses = allCourses.map((course) => {
    console.log('running weeklyCourses update')
    const {
      name,
      category,
      weekday,
      time,
      maxParticipants,
      description,
      instructor,
    } = course;
    const courseDate = new Date(startOfNextNextWeek);
    const weekDayOffset = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].indexOf(weekday);
    //calculate the date for the course based on the weekday
    courseDate.setDate(courseDate.getDate() + weekDayOffset);

    return {
      name,
      category,
      date: courseDate,
      weekday,
      time,
      maxParticipants,
      description,
      instructor,
    };
  });
  await Course.insertMany(weeklyCourses);
};

