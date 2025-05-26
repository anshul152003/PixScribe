import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {

    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });    

    await mongoose.connect(`${process.env.MONGODB_URL}/pixscribe`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export default connectDB;