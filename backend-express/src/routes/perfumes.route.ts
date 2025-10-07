// import { Router } from "express";
// import { createPerfume, getAllPerfumes } from "../controllers/perfumes.controller";
// import { validateCreatePerfume } from "../middlewares/validateCreatePerfume";

// const router = Router();

// router.post("/", validateCreatePerfume, createPerfume);
// router.get("/", getAllPerfumes);

// export default router;


import { Router, Request, Response } from "express";
import Perfume from "../models/perfumes.model";

const router = Router();

// GET all perfumes
router.get("/", async (_req: Request, res: Response) => {
  try {
    const perfumes = await Perfume.find();
    res.json(perfumes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE perfume
router.post("/", async (req: Request, res: Response) => {
  try {
    const perfume = new Perfume(req.body);
    const saved = await perfume.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
