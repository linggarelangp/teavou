import { Schema, models, model, Model } from "mongoose";
import { IProduct } from "@/app/types/product";

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    imagePublicId: String,
}, {
    timestamps: true, versionKey: false
});

export const Product: Model<IProduct> = models.Product || model<IProduct>("Product", productSchema);