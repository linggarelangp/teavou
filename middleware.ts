import { NextRequest, NextResponse } from "next/server";
import { validateProductData } from "@/app/api/middleware/productMiddleware";
import Response from "@/app/api/libs/Response";

const isValidObjectId = (id: string): boolean => {
    return /^[a-fA-F0-9]{24}$/.test(id);
}

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
    const { pathname } = request.nextUrl;
    const method: string = request.method;

    if (!pathname.startsWith("/api/product")) {
        return NextResponse.next();
    }

    try {
        if (method === "POST") {
            await validateProductData(request, true);
        } else if (method === "PUT") {
            const id = request.nextUrl.pathname.split("/").pop();
            if (!id) return Response({ status: 400, message: "Product ID is required" });
            if (!isValidObjectId(id)) return Response({ status: 400, message: "Invalid product ID" });
            await validateProductData(request, false);
        }

        return NextResponse.next();
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return Response({ status: 500, message: message });

    }
}

export const config = {
    matcher: [
        "/api/product",
        "/api/product/:path*",
    ]
}