import { NextResponse } from "next/server";

import { Response } from "@/app/libs";
import { createUser, getUsers } from "@/app/services/user.services";
import { UserPayload } from "@/app/types";
import ApiError from "@/app/libs/api.error";

export const GET = async (): Promise<NextResponse> => {
    try {
        const users = await getUsers();
        return Response({ status: 200, message: "OK", data: users });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        const { name, email, password, role = "user" } = await req.json();

        const payload: UserPayload = { name, email, password, role };

        const user = await createUser(payload);
        return Response({ status: 201, message: "Created", data: user });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};