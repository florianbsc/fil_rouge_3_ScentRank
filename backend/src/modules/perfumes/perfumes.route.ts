// VERSSION 1

// import { Router } from "express";
// import { createPerfume, getAllPerfumes } from "../controllers/perfumes.controller";
// import { validateCreatePerfume } from "../middlewares/validateCreatePerfume";

// const router = Router();

// router.post("/", validateCreatePerfume, createPerfume);
// router.get("/", getAllPerfumes);

// export default router;


// VERSION 2

// import { Router, Request, Response } from "express";
// import Perfume from "../models/perfumes.model";

// const router = Router();

// // GET all perfumes
// router.get("/", async (_req: Request, res: Response) => {
//   try {
//     const perfumes = await Perfume.find();
//     res.json(perfumes);

//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // CREATE perfume
// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const perfume = new Perfume(req.body);
//     const saved = await perfume.save();
//     res.status(201).json(saved);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;


// VERSSION 3
//
// import { Router } from "express";
// import {
//   getAllPerfumes,
//   getPerfumeById,
//   getRateForm,
//   postRating,
//   getTop3Trending,
// } from "./perfumes.controller";
//
// const router = Router();
//
// // Ces routes seront montées sous /api-V1/perfumes/
// router.get("/", getAllPerfumes);
// router.get("/:id", getPerfumeById);
// router.get("/:id/rate", getRateForm);
// router.post("/:id/rate", postRating);
// router.get("/trending/top3", getTop3Trending);
//
// export default router;


// VERSION 4



import { Router } from "express";
import { PerfumeController } from "./perfumes.controller";

const router = Router();
const perfumeController = new PerfumeController();

router.get("/", perfumeController.getAll.bind(perfumeController));
router.get("/:id", perfumeController.getById.bind(perfumeController));
router.post("/", perfumeController.create.bind(perfumeController));
router.put("/:id", perfumeController.update.bind(perfumeController));
router.delete("/:id", perfumeController.delete.bind(perfumeController));


export default router;
