import { z } from "zod";

/**
 * Schemas for validating login data using Zod
 * These schemas ensure that the data meets the required format and constraints
 * `email` and `password` are required fields with specific validation rules.
 * The `email` field must be a valid email format.
 * The `password` field must be at least 8 characters long.
 */
export const loginSchemas = z.object({
    email: z.string({
        required_error: "Email is required!",
        invalid_type_error: "Email must be a string"
    }).email({
        message: "Invalid email format"
    }),
    password: z.string({
        required_error: "Password is required!",
        invalid_type_error: "Password must be a string"
    }).min(8, {
        message: "Password must be at least 8 characters"
    }),
});

/**
 * Schemas for validating user data using Zod
 * These schemas ensure that the data meets the required format and constraints
 * `name`, `email`, and `password` are required fields with specific validation rules.
 * `role` is optional and can be either "user" or "admin".
 * The `email` field must be a valid email format.
 * The `password` field must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
 */
export const userSchemas = z.object({
    name: z.string({
        required_error: 'Name is required!',
        invalid_type_error: 'Name must be a string'
    }).min(1, {
        message: "Name is required"
    }),
    email: z.string({
        required_error: 'Email is required!',
        invalid_type_error: 'Email must be a string'
    }).email({
        message: "Invalid email format"
    }),
    password: z.string({
        required_error: 'Password is required!',
        invalid_type_error: 'Password must be a string'
    }).min(8, {
        message: "Password must be at least 8 characters"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
        message: "Password must contain uppercase, lowercase, number, and special character"
    }),
    role: z.enum(["user", "admin"]).optional(),
});

/**
 * Schemas for validating product data using Zod
 * These schemas ensure that the data meets the required format and constraints
 * `name`, and `price` are required fields with specific validation rules.
 * `name` must be a non-empty string.
 * `price` must be a number greater than 0.
 * `file` is required for product creation and must be an image file with a maximum size of 5MB.
 * For product updates, the `file` can be null or omitted.
 * The `file` field must be an instance of `File` and must be an image type.
 * The `file` field is validated to ensure it is an image and does not exceed the size limit of 5MB.
 */
const productBaseSchemas = z.object({
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
});

export const productCreateSchemas = productBaseSchemas.extend({
    file: z.instanceof(File, { message: "File is required" }).superRefine((file, ctx) => {
        if (!file.type.startsWith("image/")) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "File must be an image" });
        } else if (file.size > 5 * 1024 * 1024) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Image size exceeds 5MB limit" });
        };
    }),
});

export const productUpdateSchemas = productBaseSchemas.partial().extend({
    file: z.instanceof(File).optional().nullable().superRefine((file, ctx) => {
        if (file && file instanceof File) {
            if (!file.type.startsWith("image/")) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: "File must be an image" });
            } else if (file.size > 5 * 1024 * 1024) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Image size exceeds 5MB limit" });
            };
        };
    }),
});