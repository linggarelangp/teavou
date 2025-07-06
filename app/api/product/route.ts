import { ApiError } from "@/app/libs";
import { createProduct, getProducts } from "@/app/services/productServices";
import { CreateProductPayload } from "@/app/types/product";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
    try {
        const product = await getProducts();
        return NextResponse.json({ success: true, status: 200, data: product }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};

export const POST = async (request: Request): Promise<NextResponse> => {
    try {
        const formData = await request.formData();

        const file = formData.get("file") as File;
        const name = formData.get("name") as string;
        const description = formData.get("description") as string | "";
        const price = Number(formData.get("price"));

        const data: CreateProductPayload = { name, description, price, file };

        const product = await createProduct(data);
        return NextResponse.json({ success: true, status: 201, data: product }, { status: 201 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};