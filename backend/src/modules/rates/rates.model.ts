import mongoose, { Schema, Document } from "mongoose";

export interface IRate extends Document {
    userId: mongoose.Types.ObjectId;
    perfumeId: mongoose.Types.ObjectId;
    sentiment: number; // 1–5
    createdAt: Date;
    updatedAt: Date;
}

// const rateSchema = new Schema<IRate>(
//     {
//         userId: { type: String, required: true },
//         perfumeId: { type: String, required: true },
//         sentiment: { type: Number, min: 1, max: 5, default: null },
//         longevity: { type: Number, min: 1, max: 5, default: 0 },
//         sillage: { type: Number, min: 1, max: 5, default: 0 },
//         valueForMoney: { type: Number, min: 1, max: 5, default: 0 },
//         gender: { type: Number, min: 1, max: 3, default: 0 },
//         season: [{ type: String }],
//     },
//     { timestamps: true }
// );

const rateSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        perfumeId: {
            type: Schema.Types.ObjectId,
            ref: "Perfume",
            required: true,
        },
        sentiment: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
    },
    { timestamps: true }
);

// Un seul vote par utilisateur et par parfum
rateSchema.index({ userId: 1, perfumeId: 1 }, { unique: true });

export const RateModel = mongoose.model<IRate>("Rate", rateSchema);
