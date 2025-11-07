import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";

export interface AuthRequest extends Request {
    user?: { id: string; role: string; email: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as {
            id: string;
            role: string;
            email: string;
        };
        req.user = decoded;
        next();
    } catch {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
