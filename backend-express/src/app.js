import dotenv from "dotenv";
dotenv.config({ path: ".env.dev" });

import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import {perfumesRouter} from './routes/perfumes.route.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Exemple de route
app.get("/", (req, res) => {
  res.send("Hello World depuis Express !");
});

app.get("/test", (req, res) => res.send("API Parfum en Express 🚀"));

app.get("/perfumes", (req, res) => {
  res.json({ message: "Liste des parfums (à implémenter)" });
});

// Montes le router
app.use("/read", perfumesRouter);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("❌ Erreur MongoDB:", err));

export default app;