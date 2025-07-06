import { NextResponse } from "next/server";

import { IUser } from "@/app/types";
import { validateUser } from "@/app/services";
import { ApiError, generateToken } from "@/app/libs";

export const POST = async (request: Request): Promise<NextResponse> => {
    try {
        const { email, password } = await request.json();

        const user: Partial<IUser> = await validateUser(email, password);

        const token: string = await generateToken(user);

        const response = NextResponse.json({ success: true, status: 200, data: user }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) {
            return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        }

        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};