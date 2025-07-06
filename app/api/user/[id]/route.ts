import { Types } from "mongoose";
import { NextResponse } from "next/server";

import { ApiError } from "@/app/libs";
import { IUser } from "@/app/types";
import { deleteUser, getUserById, updateUser } from "@/app/services";

type Params = { params: Promise<{ id: string }>; };

export const GET = async (_: Request, context: Params): Promise<NextResponse> => {
    try {
        const { id } = await context.params;

        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, status: 400, error: "Invalid user ID" }, { status: 400 });
        };

        const user: IUser = await getUserById(id);
        return NextResponse.json({ success: true, status: 200, data: user }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) {
            return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        };

        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};

export const PUT = async (request: Request, context: Params): Promise<NextResponse> => {
    try {
        const { id } = await context.params;
        const { name, email, password } = await request.json();

        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, status: 400, error: "Invalid user ID" }, { status: 400 });
        };

        const data: IUser = { name, email, password };

        const updated: IUser = await updateUser(id, data);
        return NextResponse.json({ success: true, status: 200, data: updated }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) {
            return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        };

        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};

export const DELETE = async (_: Request, context: Params): Promise<NextResponse> => {
    try {
        const { id } = await context.params;

        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, status: 400, error: "Invalid user ID" }, { status: 400 });
        };

        await deleteUser(id);
        return NextResponse.json({ success: true, status: 200, message: "User deleted successfully" }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) {
            return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        };

        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};