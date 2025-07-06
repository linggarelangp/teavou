import { NextResponse } from "next/server";

export const POST = async (): Promise<NextResponse> => {
    const response = NextResponse.json({ success: true, status: 200, message: "Logout successful" }, { status: 200 });

    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",
    });

    return response;
};