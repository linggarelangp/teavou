import { NextResponse } from "next/server";

import { ApiError } from "@/app/libs";
import { createUser } from "@/app/services";
import { IUser } from "@/app/types";

export const POST = async (request: Request): Promise<NextResponse> => {
    try {
        const { name, email, password, role = "user" } = await request.json();

        const user: IUser = { name, email, password, role };

        const created: IUser = await createUser(user);
        return NextResponse.json({ success: true, status: 201, data: created }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) {
            return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        }

        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};