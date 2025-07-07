import { User } from "@/app/libs/models/userModels";
import { connection } from "@/app/libs/database/connection";

import { IUser } from "@/app/types";
import { ApiError } from "@/app/libs";
import { comparePassword, hashPassword } from "@/app/libs/node";

export const createUser = async (data: IUser): Promise<IUser> => {
    try {
        await connection();

        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) throw new ApiError(400, "User already exists with this email");

        const hashedPassword: string = await hashPassword(data.password);

        const user = await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role || "user",
        });

        return user;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const getUsers = async (): Promise<IUser[]> => {
    try {
        await connection();

        const users = await User.find().select("-password").lean();
        return users.map(user => user);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const getUserById = async (_id: string): Promise<IUser> => {
    try {
        await connection();

        const user = await User.findById(_id).select("-password").lean();
        if (!user) throw new ApiError(404, "User not found");

        return user;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const updateUser = async (_id: string, data: IUser): Promise<IUser> => {
    try {
        await connection();

        const existingUser = await User.findById(_id);
        if (!existingUser) throw new ApiError(404, "User not found");

        const passwordMatches: boolean = await comparePassword(data.password, existingUser.password);
        if (!passwordMatches) throw new ApiError(400, "Incorrect password");

        existingUser.name = data.name;
        existingUser.email = data.email;
        await existingUser.save();

        return existingUser;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const deleteUser = async (_id: string): Promise<void> => {
    try {
        await connection();

        const user = await User.findByIdAndDelete(_id);
        if (!user) throw new ApiError(404, "User not found");
        return;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const validateUser = async (email: string, password: string): Promise<Partial<IUser>> => {
    try {
        await connection();

        const user = await User.findOne({ email: email }).lean();
        if (!user) throw new ApiError(404, "User not found");

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw new ApiError(400, "Incorrect password");

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        } as Partial<IUser>;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    }
}