import { Router } from "express";
import * as UserController from "./users.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
// import * as SecureStore from "expo-secure-store";

// const token = await SecureStore.getItemAsync("token");

// fetch(url, {
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// });

const router = Router();

// await SecureStore.deleteItemAsync("token");
// await SecureStore.deleteItemAsync("user");
// router.replace("/(auth)/login");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", authMiddleware, UserController.me);

export default router;

