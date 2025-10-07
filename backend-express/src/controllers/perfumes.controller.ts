// import { Request, Response } from "express";
// import * as perfumeService from "../services/perfumes.service";
// import { validationResult } from "express-validator";
// import { CreatePerfumeDTO } from "../dto/create-perfume.dto";

// export const createPerfume = async (req: Request, res: Response) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const dto: CreatePerfumeDTO = req.body;

//     const perfume = new PerfumesModel({
//       ...dto,
//       price: dto.price
//         ? require("mongoose").Types.Decimal128.fromString(dto.price.toString())
//         : undefined,
//     });

//     const saved = await perfume.save();
//     res.status(201).json(saved);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getAllPerfumes = async (_req: Request, res: Response) => {
//   try {
//     const { id } = _req.params;
//     const perfumes = await perfumeService.findById(id);
//     res.json(perfumes);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };


import { Request, Response } from "express";
import { PerfumeModel, IPerfume } from "../models/perfumes.model";

// GET /perfumes
export const getAllPerfumes = async (_req: Request, res: Response) => {
  try {
    const perfumes = await PerfumeModel.find();
    res.status(200).json(perfumes);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET /perfumes/:id
export const getPerfumeById = async (req: Request, res: Response) => {
  try {
    const perfume = await PerfumeModel.findById(req.params.id);
    if (!perfume) return res.status(404).json({ message: "Parfum introuvable" });
    res.status(200).json(perfume);
  } catch {
    res.status(400).json({ error: "ID invalide" });
  }
};

// GET /perfumes/:id/rate → afficher formulaire
export const getRateForm = async (req: Request, res: Response) => {
  try {
    const perfume = await PerfumeModel.findById(req.params.id);
    if (!perfume) return res.status(404).json({ message: "Parfum introuvable" });

    res.status(200).json({
      perfume: {
        id: perfume._id,
        name: perfume.name,
        currentAverage: (perfume as any).averageRating,
        nbRatings: perfume.ratings?.length ?? 0,
      },
      form: {
        fields: ["note (1-5)"],
      },
    });
  } catch {
    res.status(400).json({ error: "ID invalide" });
  }
};

// POST /perfumes/:id/rate → voter
export const postRating = async (req: Request, res: Response) => {
  const { note } = req.body;

  if (typeof note !== "number" || note < 1 || note > 5) {
    return res.status(400).json({ error: "Note invalide (1-5)" });
  }

  try {
    const perfume = await PerfumeModel.findById(req.params.id);
    if (!perfume) return res.status(404).json({ message: "Parfum introuvable" });

    perfume.ratings = perfume.ratings ?? [];
    perfume.ratings.push(note);
    await perfume.save();

    res.status(201).json({
      success: true,
      averageRating: (perfume as any).averageRating,
      nbRatings: perfume.ratings.length,
    });
  } catch {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET /perfumes/trending/top3 → top 3 par moyenne
export const getTop3Trending = async (_req: Request, res: Response) => {
  try {
    const perfumes = await PerfumeModel.find();

    const sorted = perfumes
      .map((p) => ({
        perfume: p,
        average: (p as any).averageRating ?? 0,
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 3);

    res.status(200).json({
      top3: sorted.map((s) => ({
        id: s.perfume._id,
        name: s.perfume.name,
        brand: s.perfume.brand,
        averageRating: s.average,
      })),
    });
  } catch {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
