import { Response } from "@/app/libs";
import { UserPayload } from "@/app/types";
import { NextResponse } from "next/server";
import ApiError from "@/app/libs/api.error";
import { login } from "@/app/services/auth.services";
import { generateToken } from "@/app/libs/tokenizing";

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        const { email, password } = await req.json();

        const payload: Partial<UserPayload> = { email, password };

        const user = await login(payload);

        const token = generateToken(
            user,
            process.env.NEXT_API_JWT_SECRET_TOKEN!,
        );
        const response = Response({ status: 200, message: "Login successfully" });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return response;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
}