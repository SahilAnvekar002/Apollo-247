// importing mongoose
import mongoose from "mongoose";

// function to connect to database
export const connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Connected to MongoDb Successfully");
        });

        connection.on('error', (error) => {
            console.log("Failed to connect to MongoDb");
            console.log(error);
        })

    } catch (error) {
        console.log("Internal server error");
        console.log(error);
    }
}