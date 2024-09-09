import connectToDatabase from "./utils/db_connect.js";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import 'dotenv/config.js'
import { userRouter } from "./routes/userRouter.js";
import { courseRouter } from "./routes/courseRouter.js";
import { errorHandler, notFound } from "./utils/errorHandler.js";
import { createWeeklyCourses } from "./utils/setWeeklyCourses.js";
import cron from "node-cron";

connectToDatabase();
const app = express();


// Schedule weekly courses 
// minutes/hours/daysOfMonth/months/days
cron.schedule("0 2 * * 0", async () => { //runs at 2 in the morning on Sunday - 2h offset to UTC
    await createWeeklyCourses();
  });
  

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/', userRouter);
app.use('/courses', courseRouter);

app.use(notFound, errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is listening on port:', PORT))