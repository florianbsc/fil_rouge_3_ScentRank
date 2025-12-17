import mongoose from "mongoose";
import { RateModel } from "./rates.model";

// Créer ou mettre à jour un vote (UPSERT)
export const upsertRate = async (data: {
    userId: string;
    perfumeId: string;
    sentiment: number;
}) => {
    return RateModel.findOneAndUpdate(
        {
            userId: new mongoose.Types.ObjectId(data.userId),
            perfumeId: new mongoose.Types.ObjectId(data.perfumeId),
        },
        {
            sentiment: data.sentiment,
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );
};

// Stats d’un parfum
export const getPerfumeStats = async (perfumeId: string) => {
    const rates = await RateModel.find({
        perfumeId: new mongoose.Types.ObjectId(perfumeId),
    }).lean();

    if (rates.length === 0) return null;

    const average =
        rates.reduce((sum, r) => sum + r.sentiment, 0) / rates.length;

    const sentiments = {
        hate: rates.filter((r) => r.sentiment === 1).length,
        dislike: rates.filter((r) => r.sentiment === 2).length,
        ok: rates.filter((r) => r.sentiment === 3).length,
        like: rates.filter((r) => r.sentiment === 4).length,
        love: rates.filter((r) => r.sentiment === 5).length,
    };

    return {
        perfumeId,
        count: rates.length,
        average: Number(average.toFixed(2)),
        sentiments,
    };
};

// Top 5 parfums par sentiment moyen
export const getTopPerfumes = async () => {
    return RateModel.aggregate([
        {
            $group: {
                _id: "$perfumeId",
                average: { $avg: "$sentiment" },
                count: { $sum: 1 },
            },
        },
        { $sort: { average: -1, count: -1 } },
        { $limit: 5 },
    ]);
};

// Vérifier si un user a déjà voté
export const findUserRate = async (perfumeId: string, userId: string) => {
    return RateModel.findOne({
        perfumeId: new mongoose.Types.ObjectId(perfumeId),
        userId: new mongoose.Types.ObjectId(userId),
    }).lean();
};
