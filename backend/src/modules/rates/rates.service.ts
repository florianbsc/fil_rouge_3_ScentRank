import { RateModel, IRate } from "./rates.model";
import { PerfumeModel } from "../perfumes/perfumes.model";

// Créer ou mettre à jour un rate
export const upsertRate = async (data: IRate) => {
    const existing = await RateModel.findOne({
        userId: data.userId,
        perfumeId: data.perfumeId,
    });

    if (existing) {
        return RateModel.findByIdAndUpdate(existing._id, data, { new: true });
    }

    const rate = new RateModel(data);
    return rate.save();
};

// Récupérer tous les rates pour un parfum
export const getRatesByPerfume = async (perfumeId: string) => {
    return RateModel.find({ perfumeId }).exec();
};

// Calculer les tendances (moyennes)
export const getPerfumeStats = async (perfumeId: string) => {
    const rates = await RateModel.find({ perfumeId }).lean();

    if (rates.length === 0) return null;

    const average = (key: keyof IRate) => {
        const valid = rates.map((v) => Number(v[key])).filter((n) => !isNaN(n));
        return valid.length ? Number((valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2)) : null;
    };

    const sentiments = {
        love: rates.filter((v) => v.sentiment === 5).length,
        like: rates.filter((v) => v.sentiment === 4).length,
        ok: rates.filter((v) => v.sentiment === 3).length,
        dislike: rates.filter((v) => v.sentiment === 2).length,
        hate: rates.filter((v) => v.sentiment === 1).length,
    };

    return {
        perfumeId,
        count: rates.length,
        averageLongevity: average("longevity"),
        averageSillage: average("sillage"),
        averageValueForMoney: average("valueForMoney"),
        sentiments,
    };
};

// Calculer le top 5 des parfums selon score global
export const getTopPerfumes = async () => {
    const perfumes = await PerfumeModel.find();
    const results = [];

    for (const perfume of perfumes) {
        const stats = await getPerfumeStats(perfume._id.toString());
        if (stats) {
            const globalScore = ((stats.averageLongevity ?? 0) +
                (stats.averageSillage ?? 0) +
                (stats.averageValueForMoney ?? 0)) / 3;
            results.push({ perfume, globalScore });
        }
    }

    return results.sort((a, b) => b.globalScore - a.globalScore).slice(0, 5);
};
