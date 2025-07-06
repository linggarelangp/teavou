import { JWTExpired } from "jose/errors";
import { jwtVerify, SignJWT } from "jose";

import { IUser, UserPayload } from "@/app/types";

const secret = process.env.NEXT_API_JWT_SECRET_TOKEN;
if (!secret) throw new Error("JWT_SECRET is not defined");

const encoder = new TextEncoder();
const secretKey = encoder.encode(secret);

// Enum error token
export enum TokenError {
    EXPIRED = "TOKEN_EXPIRED",
    INVALID = "TOKEN_INVALID",
    UNKNOWN = "TOKEN_UNKNOWN_ERROR",
}

/**
 * Generate a JWT token using jose
 */
export const generateToken = async (
    data: Partial<IUser>,
    expiresInSeconds: number = 60 * 60
): Promise<string> => {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiration = issuedAt + expiresInSeconds;

    const payload: UserPayload = {
        _id: data._id!.toString(),
        name: data.name!,
        email: data.email!,
        role: data.role!,
    };

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt(issuedAt)
        .setExpirationTime(expiration)
        .sign(secretKey);
};

/**
 * Verify JWT and return payload if valid.
 * Throws specific errors on failure.
 */
export const verifyToken = async (
    token: string
): Promise<UserPayload> => {
    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload as UserPayload;
    } catch (error: unknown) {
        if (error instanceof JWTExpired) {
            throw new Error(TokenError.EXPIRED);
        }
        throw new Error(TokenError.INVALID);
    }
};
