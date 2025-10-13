import jwt from "jsonwebtoken";
import { UserModel, IUser } from "./users.model";
import { config } from "../../config/env";

export const register = async (email: string, password: string) => {
    const existing = await UserModel.findOne({ email });
    if (existing) throw new Error("Email already in use");
    const user = new UserModel({ email, password });
    await user.save();
    return generateToken(user);
};

export const login = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User not found");
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid password");
    return generateToken(user);
};

export const getProfile = async (userId: string): Promise<IUser | null> => {
    return UserModel.findById(userId).select("-password");
};

// Génère un JWT signé
const generateToken = (user: IUser) => {
    const token = jwt.sign(
        { id: user._id, role: user.role, email: user.email },
        config.jwtSecret,
        { expiresIn: "7d" }
    );
    return { token, user: { id: user._id, email: user.email, role: user.role } };
};
