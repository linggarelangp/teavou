import { Types } from "mongoose";
import { NextResponse } from "next/server";

import Response from "@/app/api/libs/Response";
import connection from "@/app/api/libs/connection";
import { Product } from "@/app/api/models/Product";
import { destroy, uploads } from "@/app/api/libs/imageHandler";
import { UploadApiResponse } from "cloudinary";
import { isRealFile } from "../../libs/isFile";

export const GET = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
        return Response({ status: 400, message: "Invalid product ID" });
    };

    try {
        await connection();
        const product = await Product.findById(id);

        if (!product) return Response({ status: 404, message: "Product not found" });
        return Response({ status: 200, message: "OK", data: product });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return Response({ status: 500, message: message });
    };
};

export const PUT = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    const { id } = await context.params;
    let newPath: string = "";
    let newImagePublicId: string = "";

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const name = formData.get("name") as string | null;
        const description = formData.get("description") as string | null;
        const price = Number(formData.get("price"));
        const stock = Number(formData.get("stock"));

        await connection();

        const oldData = await Product.findById(id);
        if (!oldData) return Response({ status: 404, message: "Product not found" });

        newPath = oldData.path.toString();
        newImagePublicId = oldData.imagePublicId.toString();

        if (file && (process.env.NODE_ENV !== "production" ? isRealFile(file) : file instanceof File)) {
            const upload = await uploads(file) as UploadApiResponse;

            newPath = upload.secure_url;
            newImagePublicId = upload.public_id;

            if (oldData.imagePublicId) {
                await destroy(oldData.imagePublicId);
            };
        };

        const updated = await Product.findByIdAndUpdate(id, {
            name,
            description: description || "",
            price,
            stock,
            path: newPath,
            imagePublicId: newImagePublicId,
        },
            { new: true, runValidators: true }
        );

        return Response({ status: 200, message: "Product Updated successfully", data: updated });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return Response({ status: 500, message: message });
    };
};

export const DELETE = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
        return Response({ status: 400, message: "Invalid product ID" });
    };

    try {
        await connection();

        const deleted = await Product.findByIdAndDelete(id);

        if (!deleted) return Response({ status: 404, message: "Product not found" });
        if (deleted.imagePublicId) await destroy(deleted.imagePublicId);
        return Response({ status: 200, message: "Deleted successfully" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return Response({ status: 500, message: message });
    };
};
