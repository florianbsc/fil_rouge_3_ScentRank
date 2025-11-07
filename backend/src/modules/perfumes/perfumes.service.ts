// // import { PerfumeModel, IPerfume } from "../models/perfumes.model";
//
// // // Liste de tous les parfums
// // export const findAll = async () => {
// //   return await PerfumeModel.find();
// // };
//
// // // Trouver un parfum par ID
// // export const findById = async (id: string) => {
// //   return await PerfumeModel.findById(id);
// // };
//
// // // Ajouter une note à un parfum
// // export const addRating = async (id: string, rating: number) => {
// //   const perfume = await PerfumeModel.findById(id);
// //   if (!perfume) throw new Error("Perfume not found");
//
// //   PerfumeModel.ratings.push(rating);
// //   await perfume.save();
// //   return perfume;
// // };
//
// // // Top 3 des parfums les mieux notés
// // export const getTop3 = async () => {
// //   return await PerfumeModel.aggregate([
// //     { $addFields: { avgRating: { $avg: "$ratings" } } },
// //     { $sort: { avgRating: -1 } },
// //     { $limit: 3 }
// //   ]);
// // };
//
//
//
// import { PerfumeModel, IPerfume } from "./perfumes.model";
//
// // 🔹 Liste de tous les parfums
// export const findAll = async (): Promise<IPerfume[]> => {
//   return await PerfumeModel.find();
// };
//
// // 🔹 Trouver un parfum par ID
// export const findById = async (id: string): Promise<IPerfume | null> => {
//   return await PerfumeModel.findById(id);
// };
//
// // 🔹 Ajouter une note à un parfum
// // export const addRating = async (id: string, rating: number): Promise<IPerfume> => {
// //   const perfume = await PerfumeModel.findById(id);
// //   if (!perfume) {
// //     throw new Error("Perfume not found");
// //   }
//
// //   // ✅ Corrigé : on manipule l’instance, pas le modèle !
// //   perfume.ratings = perfume.ratings ?? [];
// //   perfume.ratings.push(rating);
// //   await perfume.save();
//
// //   return perfume;
// // };
//
//
// export const addRating = async (id: string, rating: number) => {
//   const perfume = await PerfumeModel.findById(id);
//   if (!perfume) throw new Error("Perfume not found");
//
//   perfume.ratings = perfume.ratings ?? [];
//   perfume.ratings.push(rating);
//   await perfume.save();
//
//   const avg = perfume.ratings.reduce((a, b) => a + b, 0) / perfume.ratings.length;
//
//   return { perfume, averageRating: avg, nbRatings: perfume.ratings.length };
// };
//
//
// // 🔹 Top 3 des parfums les mieux notés
// export const getTop3 = async (): Promise<IPerfume[]> => {
//   return await PerfumeModel.aggregate([
//     { $addFields: { avgRating: { $avg: "$ratings" } } },
//     { $sort: { avgRating: -1 } },
//     { $limit: 3 }
//   ]);
// };


import { PerfumeModel, IPerfume } from "./perfumes.model";
import { CreatePerfumeDTO, UpdatePerfumeDTO } from "./dtos/create-perfume.dto";

export class PerfumeService {
  async getAll(): Promise<IPerfume[]> {
    return PerfumeModel.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IPerfume | null> {
    return PerfumeModel.findById(id);
  }

  async create(data: CreatePerfumeDTO): Promise<IPerfume> {
    const perfume = new PerfumeModel(data);
    return perfume.save();
  }

  async update(id: string, data: UpdatePerfumeDTO): Promise<IPerfume | null> {
    return PerfumeModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IPerfume | null> {
    return PerfumeModel.findByIdAndDelete(id);
  }
}