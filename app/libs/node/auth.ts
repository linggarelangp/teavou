import { cookies } from "next/headers";
import { verifyToken } from "@/app/libs";
import { UserPayload } from "@/app/types";

/**
 * Retrieves the user information from the token stored in cookies.
 * If the token is valid and matches the required role, returns the user payload.
 * If the token is invalid or expired, returns null.
 *
 * @param options - Optional parameters to specify required role.
 * @returns The user payload if valid, otherwise null.
 */
export const getUserFromToken = async (options?: { requiredRole?: string }): Promise<UserPayload | null> => {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;

        if (!token) return null;

        const payload = await verifyToken(token);

        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
            return null;
        };

        if (options?.requiredRole && payload.role !== options.requiredRole) {
            return null;
        };

        return payload;
    } catch {
        return null;
    };
};