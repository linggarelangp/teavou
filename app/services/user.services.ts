import connection from "@/app/libs/db/connection";
import { User } from "../models/User";
import { IUser, UserPayload } from "../types";
import ApiError from "../libs/api.error";
import { comparePassword, hashPassword } from "../libs";

export const getUsers = async (): Promise<IUser[]> => {
    try {
        await connection();
        const users = await User.find();
        return users.map(user => user);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const getUserById = async (id: string): Promise<IUser> => {
    try {
        await connection();
        const user = await User.findById(id).select("-password").lean();

        if (!user) {
            throw new ApiError(404, "User not found");
        };

        return user;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const createUser = async (payload: UserPayload): Promise<IUser> => {
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
    };
};

export const updateUser = async (id: string, payload: UserPayload): Promise<IUser> => {
    try {
        await connection();
        const existingUser = await User.findById(id);
        if (!existingUser) throw new ApiError(404, "User not found");

        const isPasswordProvided = await comparePassword(payload.password, existingUser.password);
        if (!isPasswordProvided) throw new ApiError(400, "Incorrect password");

        existingUser.name = payload.name;
        existingUser.email = payload.email;

        await existingUser.save();
        return existingUser;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const deleteUser = async (id: string): Promise<void> => {
    try {
        await connection();
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new ApiError(404, "User not found");
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};