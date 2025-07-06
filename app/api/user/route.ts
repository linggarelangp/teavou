import { NextResponse } from "next/server";

import { IUser } from "@/app/types";
import { ApiError } from "@/app/libs";
import { createUser, getUsers } from "@/app/services";

export const GET = async (): Promise<NextResponse> => {
    try {
        const users: IUser[] = await getUsers();
        return NextResponse.json({ success: true, status: 200, data: users }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) {
            return NextResponse.json({ success: false, status: error.status, error: error.message }, { status: error.status });
        };

        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};

export const POST = async (request: Request): Promise<NextResponse> => {
    try {
        const { name, email, password, role = "user" } = await request.json();

        const data: IUser = { name, email, password, role };

        const user: IUser = await createUser(data);
        return NextResponse.json({ success: true, status: 201, data: user }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) {
            return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        };

        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};