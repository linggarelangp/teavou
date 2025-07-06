import { NextRequest, NextResponse } from "next/server";

import { loginSchemas, userSchemas, productCreateSchemas, productUpdateSchemas } from "@/app/libs";

/**
 * Middleware to validate login data using Zod schemas.
 * Ensures that the request body contains valid login credentials.
 * Returns a 400 response with validation errors if the data is invalid.
 */
export const validateLoginData = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const body = await request.json();

        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json({ success: false, status: 400, message: "Bad Request", errors: [{ path: [], message: "Request body is required" }] }, { status: 400 });
        };

        const parseResult = loginSchemas.safeParse(body);

        if (parseResult.success) return NextResponse.next();

        const errors = parseResult.error.errors.map(err => ({ path: err.path, message: err.message }));
        return NextResponse.json({ success: false, status: 400, message: "Validation Error", errors }, { status: 400 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";

        return NextResponse.json({ success: false, status: 500, message }, { status: 500 });
    };
};

/**
 * Middleware to validate user data using Zod schemas.
 * Ensures that the request body contains valid user information.
 * Returns a 400 response with validation errors if the data is invalid.
 */
export const validateUserData = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const body = await request.json();

        if (!body || Object.keys(body).length === 0) {
            return NextResponse.json({ success: false, status: 400, message: "Bad Request", errors: [{ path: [], message: "Request body is required" }] }, { status: 400 });
        };

        const parseResult = userSchemas.safeParse(body);

        if (parseResult.success) return NextResponse.next();

        const errors = parseResult.error.errors.map(err => ({ path: err.path, message: err.message }));
        return NextResponse.json({ success: false, status: 400, message: "Validation Error", errors }, { status: 400 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";

        return NextResponse.json({ success: false, status: 500, message }, { status: 500 });
    };
};

/**
 * Middleware to validate product data using Zod schemas.
 * Ensures that the request contains valid product information.
 * Returns a 400 response with validation errors if the data is invalid.
 * @param request - The incoming request object.
 * @param isPost - Boolean indicating if the request is a POST (create) or PUT (update).
 */
export const validateProductData = async (request: NextRequest, isPost: boolean): Promise<NextResponse> => {
    try {
        const formData = await request.formData();

        if (!formData || [...formData.keys()].length === 0) {
            return NextResponse.json({ success: false, status: 400, message: "Bad Request", errors: [{ path: [], message: "Form data is required" }] }, { status: 400 });
        }

        const product = {
            name: formData.get("name") as string | null,
            price: Number(formData.get("price") || ""),
            file: formData.get("file") as File | null,
        };

        const parseResult = isPost
            ? productCreateSchemas.safeParse(product)
            : productUpdateSchemas.safeParse(product);

        if (parseResult.success) return NextResponse.next();

        const errors = parseResult.error.errors.map(err => ({ path: err.path, message: err.message }));
        return NextResponse.json({ success: false, status: 400, message: "Validation Error", errors }, { status: 400 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";

        return NextResponse.json({ success: false, status: 500, message }, { status: 500 });
    };
};