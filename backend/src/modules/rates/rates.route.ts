import { Router } from "express";
import * as RateController from "./rates.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Vote (utilisateur connecté)
router.post(
    "/perfume/:perfumeId",
    authMiddleware,
    RateController.upsert
);

// Stats publiques
router.get("/perfume/:perfumeId", RateController.getStats);

// Top parfums
router.get("/top", RateController.getTop);

// Vérifier si un user a voté
router.get(
    "/perfume/:perfumeId/user/:userId",
    RateController.checkIfUserRated
);

export default router;
