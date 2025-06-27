import { NextResponse } from "next/server";

import { Response } from "@/app/libs";
import { UserPayload } from "@/app/types";
import { loginSchemas, registerSchemas } from "@/app/libs/schemas/auth.schemas";

export const validateLoginData = async (req: Request): Promise<NextResponse> => {
    try {
        const body = await req.json();

        if (!body || Object.keys(body).length === 0) {
            return Response({ status: 400, message: "Request body is required" });
        }

        const data: Partial<UserPayload> = {
            email: body.email,
            password: body.password
        }

        const parseResult = loginSchemas.safeParse(data);

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

export const validateRegisterData = async (request: Request): Promise<NextResponse> => {
    try {
        const body = await request.json();

        if (!body || Object.keys(body).length === 0) {
            return Response({ status: 400, message: "Request body is required" });
        }
        const data: Partial<UserPayload> = {
            name: body.name,
            email: body.email,
            password: body.password,
            role: body.role
        };

        const parseResult = registerSchemas.safeParse(data);

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