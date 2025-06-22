import { NextResponse } from "next/server";
import connection from "@/app/libs/db/connection";

import { User } from "@/app/models/User";
import { hashPassword, Response } from "@/app/libs";

export const GET = async (): Promise<NextResponse> => {
    try {
        await connection();
        const users = await User.find();
        const user = users.map(user => user);
        return Response({ status: 200, message: "OK", data: user });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return Response({ status: 500, message: message });
    };
};

export const POST = async (req: Request): Promise<NextResponse> => {
    const { name, email, password, role = "user" } = await req.json();

    if (!name || !email || !password) {
        return Response({ status: 400, message: "Name, email, and password are required" });
    }

    try {
        const hashedPassword: string = await hashPassword(password);

        await connection();

        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role ? role : "user",
        })

        return Response({ status: 201, message: "Created", data: user });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return Response({ status: 500, message });
    };
};