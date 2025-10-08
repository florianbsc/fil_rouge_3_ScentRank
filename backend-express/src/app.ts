import express, { Application } from "express";
import perfumesRouter from "./routes/perfumes.route";

const app: Application = express();

// Middleware pour lire du JSON
app.use(express.json());

// Routes principales
app.use("/api-V1/perfumes", perfumesRouter);

export default app;
