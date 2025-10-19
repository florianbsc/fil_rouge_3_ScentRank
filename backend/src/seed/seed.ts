import mongoose from "mongoose";
import { PerfumeModel } from "../modules/perfumes/perfumes.model";

(async () => {
  await mongoose.connect("mongodb://localhost:27017/devdb");

  const count = await PerfumeModel.countDocuments();
  if (count === 0) {
    console.log("🌱 Insertion de données initiales...");
    await PerfumeModel.insertMany([
      {
        name: "Bleu de Chanel",
        brand: "Chanel",
        gender: "male",
        description: "Boisé, frais et élégant.",
        price: mongoose.Types.Decimal128.fromString("120.50"),
        ratings: [5, 4, 5],
        releaseYear: 2010,
      },
      {
        name: "Dior Sauvage",
        brand: "Dior",
        gender: "male",
        description: "Frais et vibrant.",
        price: mongoose.Types.Decimal128.fromString("130.00"),
        ratings: [4, 5, 5],
        releaseYear: 2015,
      },
      {
        name: "Black Orchid",
        brand: "Tom Ford",
        gender: "unisex",
        description: "Épicé et mystérieux.",
        price: mongoose.Types.Decimal128.fromString("150.00"),
        ratings: [5, 5, 4],
        releaseYear: 2006,
      },
    ]);
    console.log("✅ Parfums insérés !");
  } else {
    console.log("⚡ Données déjà présentes.");
  }

  await mongoose.disconnect();
})();
