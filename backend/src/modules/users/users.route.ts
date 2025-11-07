import { Router } from "express";
import * as UserController from "./users.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", authMiddleware, UserController.me);

export default router;
