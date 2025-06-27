import { NextResponse } from "next/server";

import { Response } from "@/app/libs";
import ApiError from "@/app/libs/api.error";
import { getUserByRole } from "@/app/services/user.services";

export const GET = async (
    req: Request,
    context: { params: Promise<{ role: string }> }
): Promise<NextResponse> => {
    try {
        const { role } = await context.params;

        if (!role) return Response({ status: 400, message: "Invalid User Role" });

        const user = await getUserByRole(role);
        return Response({ status: 200, message: "OK", data: user });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};