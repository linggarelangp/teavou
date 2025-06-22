import { z } from "zod";

export const userSchema = z.object({
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
    }).min(6, {
        message: "Password must be at least 6 characters"
    }),
    role: z.enum(["user", "admin"]).optional(),
});