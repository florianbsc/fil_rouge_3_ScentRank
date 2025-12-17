import { Router } from "express";
import { PerfumeController } from "./perfumes.controller";

const router = Router();
const perfumeController = new PerfumeController();

router.get("/", perfumeController.getAll.bind(perfumeController));
router.get("/:id", perfumeController.getById.bind(perfumeController));
router.post("/", perfumeController.create.bind(perfumeController));
router.put("/:id", perfumeController.update.bind(perfumeController));
router.delete("/:id", perfumeController.delete.bind(perfumeController));


export default router;
