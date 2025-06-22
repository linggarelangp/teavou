import { NextRequest, NextResponse } from "next/server";
import Response from "@/app/api/libs/Response";
import { z } from "zod";

const zodUserSchema = z.object({
    name: z.string({
        required_error: 'Name is required!',
        invalid_type_error: 'Name must be a string'
    }).min(1, {
        message: "Name is required"
    }),
    email: z.string({
        required_error: 'Email is required!',
        invalid_type_error: 'Email must be a string'
    }).email({
        message: "Invalid email format"
    }),
    password: z.string({
        required_error: 'Password is required!',
        invalid_type_error: 'Password must be a string'
    }).min(6, {
        message: "Password must be at least 6 characters"
    }),
    role: z.enum(["user", "admin"]).optional(),
});

export const validateUserData = async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();

    if (!body) {
        return Response({ status: 400, message: "Request body is required" });
    }

    try {
        const parseResult = zodUserSchema.safeParse(body);

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