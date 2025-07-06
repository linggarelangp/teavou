import { Types } from "mongoose";
import { NextResponse } from "next/server";

import { ApiError } from "@/app/libs";
import { UpdateProductPayload } from "@/app/types/product";
import { deleteProduct, updateProduct } from "@/app/services/productServices";

type Params = { params: Promise<{ id: string }>; };

export const PUT = async (request: Request, context: Params): Promise<NextResponse> => {
    try {
        const { id } = await context.params;

        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, status: 400, error: "Invalid product ID" }, { status: 400 });
        };

        const formData = await request.formData();

        const file = formData.get("file");
        const name = formData.get("name") as string;
        const description = formData.get("description") as string | "";
        const price = Number(formData.get("price"));

        const data: UpdateProductPayload = {
            name,
            description,
            price,
            file: file instanceof File ? file : null
        };

        const product = await updateProduct(id, data);
        return NextResponse.json({ success: true, status: 200, data: product }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};

export const DELETE = async (_: Request, context: Params): Promise<NextResponse> => {
    try {
        const { id } = await context.params;

        if (!Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, status: 400, error: "Invalid product ID" }, { status: 400 });
        };

        await deleteProduct(id);
        return NextResponse.json({ success: true, status: 200, message: "Product deleted successfully" }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};