// import mongoose, { Schema, Document } from "mongoose";
//
// // Interface TypeScript pour typer les documents
// export interface IPerfume extends Document {
//   name: string;
//   brand: string;
//   description?: string;
//   gender: "male" | "female" | "unisex";
//   imageUrl?: string;
//   releaseYear?: number;
//   olfactoryFam?: string[];
//   olfactoryNotes?: {
//     top?: string[];
//     heart?: string[];
//     base?: string[];
//   };
//   ratings?: number[];
//   price?: mongoose.Types.Decimal128;
//   releaseDate?: Date;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
//
// // Schéma Mongoose
// const PerfumeSchema: Schema<IPerfume> = new Schema(
//   {
//     name: { type: String, required: true },
//     brand: { type: String, required: true },
//     description: { type: String },
//     gender : {
//       type: String,
//       enum: ["male", "female", "unisex"],
//       required: true,
//     },
//     imageUrl: { Type: String},
//     releaseYear: { type: Number },
//     olfactoryFam: [{typr: String}],
//     olfactoryNotes: {
//       top: [{type: String}],
//       heart: [{type: String}],
//       base: [{type: String}],
//     },
//     ratings: { type: [Number], default: [] },
//     price: { type: mongoose.Schema.Types.Decimal128 },
//     releaseDate: {type: Date},
//
//   },
//   {
//     timestamps: true, // ajoute automatiquement createdAt / updatedAt
//     versionKey: false, // supprime le champ __v
//   }
//
// );
//
// PerfumeSchema.index({ name: 1 });
// PerfumeSchema.index({ brand: 1 });
//
// // Virtual pour moyenne des notes
// PerfumeSchema.virtual("averageRating").get(function (this: IPerfume) {
//   if (!this.ratings || this.ratings.length === 0) return 0;
//   const sum = this.ratings.reduce((a, b) => a + b, 0);
//   return Math.round((sum / this.ratings.length) * 10) / 10;
// });
//
// // Modèle exporté
// export const PerfumeModel = mongoose.model<IPerfume>("Perfume", PerfumeSchema);



import mongoose, { Schema, model, Document, Types} from "mongoose";

export interface IPerfume extends Document 
{
    _id: Types.ObjectId;
    name: string;
    brand: string;
    description?: string;
    gender: "male" | "female" | "unisex";
    imageUrl?: string;
    olfactoryFamily?: string[];
    olfactoryNotes?: {
        top?: [{type: String}],
        heart?: [{type: String}],
        base?: [{type: String}],
    };
    ratings?: number[];
    price?: mongoose.Types.Decimal128;
    releaseDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

const perfumeSchema = new Schema<IPerfume>(
{
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String },
    gender : {
    type: String,
    enum: ["male", "female", "unisex"],
    required: true,
    },
    imageUrl: { type: String},
    olfactoryFamily: [{type: String}],
    olfactoryNotes: {
        top: [{type: String}],
        heart: [{type: String}],
        base: [{type: String}],
    },
    ratings: { type: [Number], default: [] },
    price: { type: mongoose.Schema.Types.Decimal128 },
    releaseDate: {type: Date},
},
{
    timestamps: true, // ajoute automatiquement createdAt / updatedAt
    versionKey: false, // supprime le champ __v
});

perfumeSchema.index({ name: 1 });
perfumeSchema.index({ brand: 1 });

// // Virtual pour moyenne des notes
perfumeSchema.virtual("averageRating").get(function (this: IPerfume) {
  if (!this.ratings || this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((a, b) => a + b, 0);
  return Math.round((sum / this.ratings.length) * 10) / 10;
});

// Définition correcte du modèle Mongoose
export const PerfumeModel = model<IPerfume>("Perfume", perfumeSchema);
