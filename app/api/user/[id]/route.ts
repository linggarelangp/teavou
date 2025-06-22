import { Types } from "mongoose";
import { NextResponse } from "next/server";

import Response from "@/app/api/libs/Response";
import connection from "@/app/api/libs/connection";

import { IUser } from "@/app/api/types";
import { User } from "@/app/api/models/User";
import { comparePassword } from "@/app/api/libs/hashingPassword";

export const GET = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
        return Response({ status: 400, message: "Invalid User ID" });
    };

    try {
        await connection();
        const user = await User.findById(id)
            .select("-password")
            .lean();

        if (!user) return Response({ status: 404, message: "User not found" });
        return Response({ status: 200, message: "OK", data: user });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return Response({ status: 500, message: message });
    };
};

export const PUT = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    const { id } = await context.params;
    const { name, email, password } = await req.json();

    if (!Types.ObjectId.isValid(id)) {
        return Response({ status: 400, message: "Invalid User ID" });
    };

    try {
        await connection();

        const user = await User.findById(id, "_id password");
        if (!user) return Response({ status: 404, message: "User not found" });

        const isPasswordProvided = await comparePassword(password, user.password);
        if (!isPasswordProvided) return Response({ status: 400, message: "Incorrect password" });

        const updatesUser: Partial<IUser> = { name, email };

        const updatedUser = await User.findByIdAndUpdate(id, updatesUser, { new: true, runValidators: true });

        return Response({ status: 200, message: "User Updated successfully", data: updatedUser });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return Response({ status: 500, message: message });
    };
};

export const DELETE = async (
    req: Request,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
        return Response({ status: 400, message: "Invalid product ID" });
    };

    try {
        await connection();

        const deleted = await User.findByIdAndDelete(id);

        if (!deleted) return Response({ status: 404, message: "User not found" });
        return Response({ status: 200, message: "Account has been deleted" });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return Response({ status: 500, message: message });
    };
};
