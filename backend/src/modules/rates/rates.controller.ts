import { Request, Response } from "express";
import * as RateService from "./rates.service";

export const upsert = async (req: Request, res: Response) => {
    try {
        const data = {
            ...req.body,
            perfumeId: req.params.perfumeId,  // important
            userId: req.body.userId,          // OK
        };

        const rate = await RateService.upsertRate(data);
        res.status(201).json(rate);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to save rate" });
    }
};

export const getStats = async (req: Request, res: Response) => {
    const stats = await RateService.getPerfumeStats(req.params.perfumeId);
    if (!stats) return res.status(404).json({ message: "No rates yet" });
    res.json(stats);
};

export const getTop = async (_req: Request, res: Response) => {
    try {
        const top = await RateService.getTopPerfumes();
        res.status(200).jsonp(top);
    } catch (error) {
        console.error(error);
    }
};

export const checkIfUserRated = async (req: Request, res: Response) => {
    const { perfumeId, userId } = req.params;

    try {
        const rate = await RateService.findUserRate(perfumeId, userId);

        if (!rate) {
            return res.json({ alreadyRated: false });
        }

        return res.json({
            alreadyRated: true,
            note: rate.sentiment, // ou la note globale que tu veux renvoyer
            rate,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error checking rate" });
    }
};

