import { Router, Request, Response } from "express";
import { PerfumesModel } from "../models/perfumes.model";
import { validateCreatePerfume } from "../middlewares/validateCreatePerfume";
import { validationResult } from "express-validator";

const router = Router();

// CREATE perfume
router.post("/", validateCreatePerfume, async (req : Request, res : Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const perfume = new PerfumesModel({
      ...req.body,
      price: req.body.price
        ? require("mongoose").Types.Decimal128.fromString(req.body.price.toString())
        : undefined,
    });

    const saved = await perfume.save();
    res.status(201).json(saved);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// READ all perfumes
router.get("/", async (_req, res) => {
  try {
    const perfumes = await PerfumesModel.find();
    res.json(perfumes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
