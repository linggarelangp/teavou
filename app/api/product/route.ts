import { NextResponse } from "next/server";

import { Response } from "@/app/libs";
import { createProduct, getProducts } from "@/app/services/product.services";
import { CreateProductPayload } from "@/app/types";
import ApiError from "@/app/libs/api.error";

export const GET = async (): Promise<NextResponse> => {
    try {
        const product = await getProducts();
        return Response({ status: 200, message: "OK", data: product });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File;
        const name = formData.get("name") as string;
        const description = formData.get("description") as string | "";
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));

        const payload: CreateProductPayload = { file, name, description, price, stock }

        const product = await createProduct(payload);
        return Response({ status: 201, message: "Product created successfully", data: product });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};