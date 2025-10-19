import mongoose from "mongoose";
import { config } from "./env";
import { PerfumeModel } from "../modules/perfumes/perfumes.model";
// import { UserModel } from "../modules/users/users.model";

// Connexion MongoDB

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("✅ Connected to MongoDB");

    //  Création de l'admin
    // const adminEmail = "admin@scentrank.com";
    // const adminPassword = "admin123"; 

    // const existingAdmin = await UserModel.findOne({ email: adminEmail });
    // if (!existingAdmin) {
    //   await UserModel.create({
    //     email: adminEmail,
    //     password: adminPassword,
    //     role: "admin",
    //   });
    //   console.log(`Admin créé : ${adminEmail} / ${adminPassword}`);
    // } else {
    //   console.log("Admin déjà existant");
    // }

         const count = await PerfumeModel.countDocuments();
          if (count === 0) {
            console.log("🌱 Insertion de données initiales...");
            await PerfumeModel.insertMany([
              {
                name: "Bleu de Chanel",
                brand: "Chanel",
                description: "Boisé, frais et élégant.",
                imageUrl: "https://www.avenue-des-parfums.fr/93820-large_default/bleu-de-chanel-eau-de-parfum-vaporisateur.jpg",
                gender: "male",
                price: mongoose.Types.Decimal128.fromString("120.50"),
                releaseYear: 2010,
              },
              {
                name: "Dior Sauvage",
                brand: "Dior",
                gender: "male",
                description: "Frais et vibrant.",
                price: mongoose.Types.Decimal128.fromString("130.00"),
                // ratings: [4, 5, 5],
                releaseYear: 2015,
              },
              {
                name: "Black Orchid",
                brand: "Tom Ford",
                gender: "unisex",
                description: "Épicé et mystérieux.",
                price: mongoose.Types.Decimal128.fromString("150.00"),
                // ratings: [5, 5, 4],
                releaseYear: 2006,
              },
            ]);
            console.log("✅ Parfums insérés !");
          } else {
            console.log("⚡ Données déjà présentes.");
          }

    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;