import { Schema, models, model, Model } from "mongoose";
import { IProduct } from "@/app/api/types/product";

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    path: String,
    imagePublicId: String,
}, {
    timestamps: true, versionKey: false
});

export const Product: Model<IProduct> = models.Product || model<IProduct>("Product", productSchema);