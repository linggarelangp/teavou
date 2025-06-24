import { Types } from "mongoose";
import { NextResponse } from "next/server";

import { Response } from "@/app/libs";
import { UserPayload } from "@/app/types";
import ApiError from "@/app/libs/api.error";
import { deleteUser, getUserById, updateUser } from "@/app/services/user.services";

export const GET = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    try {
        const { id } = await context.params;

        if (!Types.ObjectId.isValid(id)) return Response({ status: 400, message: "Invalid User ID" });

        const user = await getUserById(id);
        return Response({ status: 200, message: "OK", data: user });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};

export const PUT = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    try {
        const { id } = await context.params;
        const { name, email, password } = await req.json();

        if (!Types.ObjectId.isValid(id)) {
            return Response({ status: 400, message: "Invalid User ID" });
        };

        const payload: UserPayload = { name, email, password };

        const updated = await updateUser(id, payload);
        return Response({ status: 200, message: "User Updated successfully", data: updated });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};

export const DELETE = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    try {
        const { id } = await context.params;

        if (!Types.ObjectId.isValid(id)) {
            return Response({ status: 400, message: "Invalid User ID" });
        };

        await deleteUser(id);
        return Response({ status: 200, message: "User deleted successfully" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};
