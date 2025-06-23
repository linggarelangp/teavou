import { z } from "zod";
import { validateImageFile, validateImageFileUpdate } from "@/app/libs/valid.image.file";

const productBaseSchema = z.object({
    name: z.string({
        required_error: "Product name is required!",
        invalid_type_error: "Product name must be a string"
    }).min(1, {
        message: "Product name is required"
    }),
    price: z.number({
        required_error: "Product price is required!",
        invalid_type_error: "Product price must be a number"
    }).min(1, {
        message: "Product price must be greater than 0"
    }),
    stock: z.number({
        required_error: "Product stock is required!",
        invalid_type_error: "Product stock must be a number"
    }).nonnegative({ message: "Product stock cannot be negative" })
});

export const productCreateSchema = productBaseSchema.extend({
    file: z.instanceof(File, { message: "File is required" }).superRefine(validateImageFile)
});

export const productUpdateSchema = productBaseSchema.partial().extend({
    file: z.instanceof(File).optional().nullable().superRefine(validateImageFileUpdate)
});