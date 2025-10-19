import { Request, Response } from "express";
import * as UserService from "./users.service";

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await UserService.register(email, password);
        res.status(201).json(result);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await UserService.login(email, password);
        res.json(result);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const me = async (req: any, res: Response) => {
    try {
        const user = await UserService.getProfile(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
