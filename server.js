import connectToDatabase from "./utils/db_connect";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

connectToDatabase();
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());
app.use(cookieParser());





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is listening on port:', PORT))