import { NextRequest, NextResponse } from "next/server";

import { Response } from "@/app/libs";
import { userSchemas } from "@/app/libs/schemas/user.schemas";

export const validateUserData = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const body = await req.json();

        if (!body || Object.keys(body).length === 0) {
            return Response({ status: 400, message: "Request body is required" });
        }

        const parseResult = userSchemas.safeParse(body);

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