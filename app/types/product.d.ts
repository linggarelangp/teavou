import { type Types } from "mongoose";

export interface IProduct {
    _id?: Types.ObjectId | string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    imagePublicId: string;
    path: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    imagePublicId: string;
    path: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductPayload {
    name: string;
    description?: string;
    price: number;
    stock: number;
}

export interface CreateProductPayload extends ProductPayload { file: File; }

export interface UpdateProductPayload extends ProductPayload { file?: File | null; }

export interface UploadProduct {
    file: File;
    name: string;
    description?: string | null;
    price: number;
    stock: number;
};