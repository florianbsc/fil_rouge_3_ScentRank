// import app from "./app";
// import dotenv from "dotenv";
// // dotenv.config({ path: ".env.dev" });


// dotenv.config();

// const PORT = process.env.PORT || 3000;

// import { connectDB } from "./config/db";

// connectDB();

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/devdb";

// Connexion MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });
