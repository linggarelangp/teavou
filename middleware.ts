import { NextRequest, NextResponse } from "next/server";

import { getUserFromToken } from "@/app/libs/node/auth";
import { validateProductData, validateUserData } from "@/app/libs";

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
    const { pathname } = request.nextUrl;
    const admin = await getUserFromToken({ requiredRole: "admin" });
    let response: NextResponse;

    try {
        switch (true) {
            case pathname.startsWith("/api/user"): {
                if (!admin) return NextResponse.json({ success: false, status: 401, message: "Unauthorized access" }, { status: 401 });

                if (pathname.startsWith("/api/user") && ["POST", "PUT"].includes(request.method)) {
                    response = await validateUserData(request);
                    return response;
                };

                return NextResponse.next();
            }
            case pathname.startsWith("/api/product") && ["POST", "PUT"].includes(request.method): {
                response = await validateProductData(request, request.method === "POST" ? true : false);
                return response;
            }
            case pathname.startsWith("/admin"): {
                if (!admin) return NextResponse.redirect(new URL("/", request.url));
                return NextResponse.next();
            }
            default: {
                return NextResponse.next();
            };
        };

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });

    };
};

export const config = {
    matcher: [
        "/api/user",
        "/api/user/:path*",
        "/api/product",
        "/api/product/:path*",
        "/admin",
        "/admin/:path*"
    ]
};