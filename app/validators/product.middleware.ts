import { NextRequest, NextResponse } from "next/server";

import { Response } from "@/app/libs";
import { productCreateSchemas, productUpdateSchemas } from "@/app/libs/schemas/product.schemas";

export const validateProductData = async (request: NextRequest, isPost: boolean): Promise<NextResponse> => {
    try {
        const formData = await request.formData();

        if (!formData || [...formData.keys()].length === 0)
            return Response({ status: 400, message: "Request body is required" });

        const product = {
            name: formData.get("name") as string | null,
            price: Number(formData.get("price") ?? ""),
            stock: Number(formData.get("stock") ?? ""),
            file: formData.get("file") as File | null,
        }

        const parseResult = isPost
            ? productCreateSchemas.safeParse(product)
            : productUpdateSchemas.safeParse(product);

        if (parseResult.success) return NextResponse.next();
        const errors = parseResult.error.errors.map(err => ({
            path: err.path,
            message: err.message
        }));
        return Response({ status: 400, message: "Bad Request", errors });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return Response({ status: 500, message: message });
    };
};