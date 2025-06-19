import { NextRequest, NextResponse } from "next/server";
import Response from "@/app/api/libs/Response";

export const validateProductData = async (request: NextRequest, isPost: boolean): Promise<NextResponse | void> => {
    try {
        const formData = await request.formData();

        const file = formData.get("file") as File | null;
        const name = formData.get("name") as string | null;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));

        if (!name || !price || !stock) return Response({ status: 400, message: "All fields are required" });
        if (isNaN(price) || isNaN(stock)) return Response({ status: 400, message: "Price and stock must be numbers" });

        if (isPost) {
            if (!file || !(file instanceof File)) return Response({ status: 400, message: "File is required" });
            else if (!file.type.startsWith("image/")) return Response({ status: 400, message: "File must be an image" });
            else if (file.size > 10 * 1024 * 1024) return Response({ status: 400, message: "Image size exceeds 5MB limit" });
        };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return Response({ status: 500, message: message });
    };
};