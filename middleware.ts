import { NextRequest, NextResponse } from "next/server";

import { getUserFromToken } from "@/app/libs/node/auth";
import { validateProductData, validateUserData } from "@/app/libs";

/**
 * Middleware to handle various API routes and page access control.
 * It checks user roles, validates data for specific routes, and redirects as necessary.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object to be sent back to the client.
 */
export const middleware = async (request: NextRequest): Promise<NextResponse> => {
    const { pathname } = request.nextUrl;
    const admin = await getUserFromToken({ requiredRole: "admin" });
    let response: NextResponse;

    try {
        switch (true) {
            // User API routes
            case pathname.startsWith("/api/user"): {
                if (!admin) return NextResponse.json({ success: false, status: 401, message: "Unauthorized access" }, { status: 401 });

                if (pathname.startsWith("/api/user") && ["POST", "PUT"].includes(request.method)) {
                    response = await validateUserData(request);
                    return response;
                };

                return NextResponse.next();
            }
            // Product API routes
            case pathname.startsWith("/api/product") && ["POST", "PUT"].includes(request.method): {
                response = await validateProductData(request, request.method === "POST" ? true : false);
                return response;
            }
            // Admin Pages
            case pathname.startsWith("/admin"): {
                if (!admin) return NextResponse.redirect(new URL("/", request.url));
                return NextResponse.next();
            }
            // Orders Pages
            case pathname.startsWith("/orders"): {
                const user = await getUserFromToken();
                if (!user) return NextResponse.redirect(new URL("/login", request.url));
                return NextResponse.next();
            }
            // Default case for other API routes and pages
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
        "/orders",
        "/orders/:path*",
        "/admin",
        "/admin/:path*"
    ]
};