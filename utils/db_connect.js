import mongoose from "mongoose";


export default function connectToDatabase() {
    
    try {
        const URL = process.env.DB_URL;
        mongoose.connect(URL);
        mongoose.connection.on('connected', () => console.log('connected to MongoDB'));
        mongoose.connection.on('error', () => console.log('connection to DB failed'))
    }catch (error) {
        console.log(error)
    }

}
