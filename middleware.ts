import { NextRequest, NextResponse } from "next/server";

import { Response } from "@/app/libs/response";
import { validateUserData, validateProductData, validateLoginData, validateRegisterData } from "@/app/validators";

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
    const { pathname } = request.nextUrl;
    const method: string = request.method;
    let isResponse: NextResponse;

    try {
        switch (true) {
            case pathname.startsWith("/api/product") && ["POST", "PUT"].includes(method): {
                isResponse = await validateProductData(request, method === "POST" ? true : false);
                return isResponse;
            }
            case pathname.startsWith("/api/user") && ["POST", "PUT"].includes(method): {
                isResponse = await validateUserData(request);
                return isResponse;
            }
            case pathname.startsWith("/api/auth/register"): {
                isResponse = await validateLoginData(request);
                return isResponse;
            }
            case pathname.startsWith("/api/auth/login"): {
                isResponse = await validateRegisterData(request);
                return isResponse;
            }
            default: {
                return NextResponse.next();
            }
        }

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return Response({ status: 500, message: message });

    }
}

export const config = {
    matcher: [
        "/api/product",
        "/api/product/:path*",
        "/api/user",
        "/api/user/:path*",
        "/api/auth"
    ]
}