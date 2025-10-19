import { Router } from "express";
import * as RateController from "./rates.controller";

const router = Router();

router.post("/perfume/:perfumeId", RateController.upsert);                // Créer / modifier un vote
router.get("/perfume/:perfumeId", RateController.getStats); // Statistiques pour un parfum
router.get("/top", RateController.getTop);              // Top 5 global

export default router;
