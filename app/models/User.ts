import { Schema, models, model, Model } from "mongoose";
import { IUser } from "@/app/types";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"], default: "user" },
}, {
    timestamps: true, versionKey: false
}).set("toJSON", {
    transform: (_, ret) => {
        delete ret.password;
        return ret;
    }
});

export const User: Model<IUser> = models.User || model<IUser>("Users", userSchema);