import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as RateService from "./rates.service";
import { UserModel } from "../users/users.model";

export const upsert = async (req: AuthRequest, res: Response) => {
    try {
        const { sentiment } = req.body;
        const userId = req.user?.id;
        const perfumeId = req.params.perfumeId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthenticated" });
        }

        if (!sentiment || sentiment < 1 || sentiment > 5) {
            return res.status(400).json({ message: "Invalid sentiment" });
        }

        // Vérifier que l'utilisateur existe
        const userExists = await UserModel.exists({ _id: userId });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const rate = await RateService.upsertRate({
            userId,
            perfumeId,
            sentiment,
        });

        res.status(201).json(rate);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to save rate" });
    }
};

export const getStats = async (req: AuthRequest, res: Response) => {
    const stats = await RateService.getPerfumeStats(req.params.perfumeId);
    if (!stats) {
        return res.status(404).json({ message: "No rates yet" });
    }
    res.json(stats);
};

export const getTop = async (_req: AuthRequest, res: Response) => {
    try {
        const top = await RateService.getTopPerfumes();
        res.status(200).json(top);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch top perfumes" });
    }
};

export const checkIfUserRated = async (req: AuthRequest, res: Response) => {
    const { perfumeId, userId } = req.params;

    try {
        const rate = await RateService.findUserRate(perfumeId, userId);

        if (!rate) {
            return res.json({ alreadyRated: false });
        }

        return res.json({
            alreadyRated: true,
            sentiment: rate.sentiment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error checking rate" });
    }
};

export const checkIfCurrentUserRated = async (
    req: AuthRequest,
    res: Response
) => {
    const userId = req.user?.id;
    const { perfumeId } = req.params;

    if (!userId) {
        return res.status(401).json({ alreadyRated: false });
    }

    const rate = await RateService.findUserRate(perfumeId, userId);

    if (!rate) {
        return res.json({ alreadyRated: false });
    }

    return res.json({
        alreadyRated: true,
        sentiment: rate.sentiment,
    });
};

