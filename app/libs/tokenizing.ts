import jwt from "jsonwebtoken";
import { UserPayload } from "@/app/types";

export const generateToken = (payload: Partial<UserPayload>, secret: string, expiresIn: number = 1 * 60 * 60): string => {
    if (!secret) throw new Error("JWT_SECRET is not defined in environment variables");
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
};

export const verifyToken = (token: string, secret: string): Partial<UserPayload> => {
    try {
        return jwt.verify(token, secret) as Partial<UserPayload>;
    } catch (error: unknown) {
        if (error instanceof jwt.JsonWebTokenError) throw new Error("Invalid token");
        throw new Error("Something went wrong while verifying the token");
    }
};