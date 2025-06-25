import { Types } from "mongoose";
import { NextResponse } from "next/server";

import { Response } from "@/app/libs";
import { UpdateProductPayload } from "@/app/types";
import { deleteProduct, getProductById, updateProduct } from "@/app/services/product.services";
import ApiError from "@/app/libs/api.error";
import { cookiesValidation } from "@/app/libs/validation.headers";

export const GET = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    try {
        const { id } = await context.params;

        if (!Types.ObjectId.isValid(id)) return Response({ status: 400, message: "Invalid product ID" });

        const product = await getProductById(id);
        return Response({ status: 200, message: "OK", data: product });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};

export const PUT = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    try {
        const headers = req.headers.get("cookie") || "";
        cookiesValidation(headers);

        const { id } = await context.params;

        if (!Types.ObjectId.isValid(id)) return Response({ status: 400, message: "Invalid product ID" });

        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));

        const payload: UpdateProductPayload = { name, description, price, stock, file };

        const updated = await updateProduct(id, payload);
        return Response({ status: 200, message: "Product Updated successfully", data: updated });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};

export const DELETE = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    try {
        const headers = req.headers.get("cookie") || "";
        cookiesValidation(headers);

        const { id } = await context.params;

        if (!Types.ObjectId.isValid(id)) return Response({ status: 400, message: "Invalid product ID" });

        await deleteProduct(id);
        return Response({ status: 200, message: "Deleted successfully" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) return Response({ status: error.status, message: message });
        return Response({ status: 500, message: message });
    };
};
