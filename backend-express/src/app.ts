// import express from "express";
// import perfumesRouter from "./routes/perfumes.route";

// const app = express();

// app.use(express.json());

// // Routes
// app.use("/perfumes", perfumesRouter);

// export default app;


import express, { Application } from "express";
import perfumesRouter from "./routes/perfumes.route";

const app: Application = express();

app.use(express.json());

// Routes
app.use("/api/perfumes", perfumesRouter);

export default app;
