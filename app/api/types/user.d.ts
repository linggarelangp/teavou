import { type Types } from "mongoose";

export interface IUser {
    _id?: Types.ObjectId | string;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
};