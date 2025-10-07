// import { PerfumeModel, IPerfume } from "../models/perfumes.model";

// // Liste de tous les parfums
// export const findAll = async () => {
//   return await PerfumeModel.find();
// };

// // Trouver un parfum par ID
// export const findById = async (id: string) => {
//   return await PerfumeModel.findById(id);
// };

// // Ajouter une note à un parfum
// export const addRating = async (id: string, rating: number) => {
//   const perfume = await PerfumeModel.findById(id);
//   if (!perfume) throw new Error("Perfume not found");

//   PerfumeModel.ratings.push(rating);
//   await perfume.save();
//   return perfume;
// };

// // Top 3 des parfums les mieux notés
// export const getTop3 = async () => {
//   return await PerfumeModel.aggregate([
//     { $addFields: { avgRating: { $avg: "$ratings" } } },
//     { $sort: { avgRating: -1 } },
//     { $limit: 3 }
//   ]);
// };



import { PerfumeModel, IPerfume } from "../models/perfumes.model";

// 🔹 Liste de tous les parfums
export const findAll = async (): Promise<IPerfume[]> => {
  return await PerfumeModel.find();
};

// 🔹 Trouver un parfum par ID
export const findById = async (id: string): Promise<IPerfume | null> => {
  return await PerfumeModel.findById(id);
};

// 🔹 Ajouter une note à un parfum
export const addRating = async (id: string, rating: number): Promise<IPerfume> => {
  const perfume = await PerfumeModel.findById(id);
  if (!perfume) {
    throw new Error("Perfume not found");
  }

  // ✅ Corrigé : on manipule l’instance, pas le modèle !
  perfume.ratings = perfume.ratings ?? [];
  perfume.ratings.push(rating);
  await perfume.save();

  return perfume;
};

// 🔹 Top 3 des parfums les mieux notés
export const getTop3 = async (): Promise<IPerfume[]> => {
  return await PerfumeModel.aggregate([
    { $addFields: { avgRating: { $avg: "$ratings" } } },
    { $sort: { avgRating: -1 } },
    { $limit: 3 }
  ]);
};
