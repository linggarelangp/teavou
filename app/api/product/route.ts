import { NextResponse } from "next/server";

import Response from "@/app/api/libs/Response";
import connection from "@/app/api/libs/connection";
import { Product } from "@/app/api/models/Product";
import { uploads } from "@/app/api/libs/imageHandler";

export const GET = async (): Promise<NextResponse> => {
    try {
        await connection();
        const products = await Product.find();
        const product = products.map(product => product);
        return Response({ status: 200, message: "OK", data: product });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return Response({ status: 500, message: message });
    };
};

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File | null;
        const name = formData.get("name") as string | null;
        const description = formData.get("description") as string | null;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));

        const upload = await uploads(file!);

        await connection();

        const product = await Product.create({
            name: name,
            description: description || "",
            price: price,
            stock: stock,
            path: upload.secure_url,
            imagePublicId: upload.public_id,
        });

        return Response({ status: 201, message: "Product created successfully", data: product });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown erroror occurred";
        return Response({ status: 500, message });
    };
};