import { z } from "zod";
import { userSchemas } from "@/app/libs/schemas/user.schemas";

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
    })
});

export const registerSchemas = userSchemas.extend({
    confirmPassword: z.string({
        required_error: "Confirm Password is required!",
        invalid_type_error: "Confirm Password must be a string"
    }).min(8, {
        message: "Confirm Password must be at least 8 characters"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
        message: "Confirm Password must contain uppercase, lowercase, number, and special character"
    }),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password and confirm password must match",
            path: ["confirmPassword"],
        });
    }
});