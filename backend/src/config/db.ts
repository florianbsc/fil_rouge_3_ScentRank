import mongoose from "mongoose";
import { config } from "./env";

// Connexion MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("✅ Connected to MongoDB -->" + config.MONGO_URI);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;