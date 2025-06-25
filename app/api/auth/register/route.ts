import { Response } from "@/app/libs";
import { UserPayload } from "@/app/types";
import { NextResponse } from "next/server";
import ApiError from "@/app/libs/api.error";
import { register } from "@/app/services/auth.services";

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        const { name, email, password, role = "user" } = await req.json();

        const payload: UserPayload = { name, email, password, role };

        await register(payload);
        return Response({ status: 201, message: "Account Created" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};