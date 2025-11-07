import mongoose, { Schema, Document } from "mongoose";

export interface IRate extends Document {
    userId: string;        // ID de l’utilisateur (référence à User)
    perfumeId: string;     // ID du parfum
    sentiment: number;
    longevity: number;     // ex: 1–5
    sillage: number;       // ex: 1–5
    valueForMoney: number; // ex: 1–5
    gender: number;
    season: string[];      // ex: ["summer", "day"]
    createdAt: Date;
    updatedAt: Date;
}

const rateSchema = new Schema<IRate>(
    {
        userId: { type: String, required: true },
        perfumeId: { type: String, required: true },
        sentiment: { type:  Number, min: 1, max: 5, default: 0 , required: true },
        longevity: { type: Number, min: 1, max: 5, default: 0 },
        sillage: { type: Number, min: 1, max: 5, default: 0 },
        valueForMoney: { type: Number, min: 1, max: 5, default: 0 },
        gender: { type: Number, min: 1, max: 3, default: 0 },
        season: [{ type: String }],
    },
    { timestamps: true }
);

// Empêche un utilisateur de rater deux fois pour le même parfum
rateSchema.index({ userId: 1, perfumeId: 1 }, { unique: true });

export const RateModel = mongoose.model<IRate>("Rate", rateSchema);
