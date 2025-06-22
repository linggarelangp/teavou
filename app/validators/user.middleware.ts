import { NextRequest, NextResponse } from "next/server";

import { Response } from "@/app/libs";
import { userSchema } from "@/app/libs/schemas/user.schemas";

export const validateUserData = async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();

    if (!body) {
        return Response({ status: 400, message: "Request body is required" });
    }

    try {
        const parseResult = userSchema.safeParse(body);

        if (parseResult.success) return NextResponse.next();
        const errors = parseResult.error.errors.map(err => ({
            path: err.path,
            message: err.message
        }));

        return Response({ status: 400, message: "Bad Request", errors });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return Response({ status: 500, message: message });
    };
};