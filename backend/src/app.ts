// import express, { Application } from "express";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import perfumesRouter from "./modules/perfumes/perfumes.route";
import usersRouter from "./modules/users/users.route";
import ratesRouter from "./modules/rates/rates.route";

// const app: Application = express();
const app = express();

// Middlewares globaux
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api-V1/perfumes", perfumesRouter);
app.use("/api-V1/users", usersRouter);
app.use("/api-V1/rates", ratesRouter);


// Route de test
app.get("/", (_, res) => {
    res.send("ScentRank API is running!");
});

export default app;
