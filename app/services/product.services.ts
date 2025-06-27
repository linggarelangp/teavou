import connection from "@/app/libs/db/connection";

import ApiError from "@/app/libs/api.error";

import { Product } from "@/app/models/Product";
import { destroy, uploads } from "@/app/libs/cloudinary.helper";
import { IProduct, CreateProductPayload, UpdateProductPayload } from "@/app/types";

export const getProducts = async (): Promise<IProduct[]> => {
    try {
        await connection();
        const products = await Product.find();
        return products.map(product => product);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const getProductById = async (id: string): Promise<IProduct> => {
    try {
        await connection();
        const product = await Product.findById(id);

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        return product;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
}

export const createProduct = async (payload: CreateProductPayload): Promise<IProduct> => {
    try {
        const upload = await uploads(payload.file);

        await connection();

        const product = await Product.create({
            name: payload.name,
            description: payload.description || "",
            price: payload.price,
            stock: payload.stock,
            path: upload.secure_url,
            imagePublicId: upload.public_id,
        });

        return product;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
}

export const updateProduct = async (id: string, payload: UpdateProductPayload): Promise<IProduct> => {
    try {
        await connection();

        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            throw new ApiError(404, "Product not found");
        }

        console.log("Payload:", payload);

        existingProduct.name = payload.name ? payload.name : existingProduct.name;
        existingProduct.description = payload.description ? payload.description : existingProduct.description;
        existingProduct.price = payload.price ? payload.price : existingProduct.price;
        existingProduct.stock = payload.stock ? payload.stock : existingProduct.stock;

        if (payload.file) {
            const upload = await uploads(payload.file);
            existingProduct.path = upload.secure_url;
            existingProduct.imagePublicId = upload.public_id;
        }

        await existingProduct.save();
        return existingProduct;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
}

export const deleteProduct = async (id: string): Promise<void> => {
    try {
        const product = await Product.findById(id);

        if (!product) throw new ApiError(404, "Product not found");
        if (product.imagePublicId) await destroy(product.imagePublicId);

        await product.deleteOne();
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};