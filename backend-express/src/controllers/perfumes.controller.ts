// import { Request, Response } from "express";
// import { PerfumesModel } from "../models/perfumes.model";
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
//     const perfumes = await PerfumesModel.find();
//     res.json(perfumes);
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };
