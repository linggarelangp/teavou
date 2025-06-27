import connection from "@/app/libs/db/connection";

import ApiError from "@/app/libs/api.error";

import { User } from "@/app/models/User";
import { IUser, UserPayload } from "@/app/types";
import { comparePassword, hashPassword } from "@/app/libs/hashing";

export const register = async (payload: UserPayload): Promise<IUser> => {
    try {
        await connection();

        const existingUser = await User.findOne({ email: payload.email });

        if (existingUser) throw new ApiError(400, "User already exists with this email");

        const hashedPassword: string = await hashPassword(payload.password);

        const user = await User.create({
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            role: payload.role || "user",
        });

        return user;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    }
};

export const login = async (payload: Partial<UserPayload>): Promise<IUser> => {
    try {
        await connection();

        const user = await User.findOne({ email: payload.email }).lean();

        if (!user) throw new ApiError(404, "User not found");
        if (!payload.password) throw new ApiError(400, "Password is required");

        const isPasswordValid = await comparePassword(payload.password, user.password);
        if (!isPasswordValid) throw new ApiError(400, "Incorrect password");
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        } as IUser;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    }
};