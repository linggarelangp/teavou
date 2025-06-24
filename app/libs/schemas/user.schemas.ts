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
    }).min(8, {
        message: "Password must be at least 8 characters"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/, {
        message: "Password must contain uppercase, lowercase, number, and special character"
    }),
    role: z.enum(["user", "admin"]).optional(),
});