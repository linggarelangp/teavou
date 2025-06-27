import { parse } from "cookie";

import ApiError from "@/app/libs/api.error";

import { verifyToken } from "@/app/libs/tokenizing";

export const cookiesValidation = (value: string): void => {
    if (value === "") throw new ApiError(401, "Unauthorized");

    const { token } = parse(value);
    if (!token) throw new ApiError(401, "Unauthorized");

    const decodedToken = verifyToken(token, process.env.NEXT_API_JWT_SECRET_TOKEN!);
    if (!decodedToken) throw new ApiError(401, "Unauthorized");

    if (decodedToken.role !== "admin") throw new ApiError(403, "Forbidden");
}