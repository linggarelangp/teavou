
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_API_JWT_SECRET_TOKEN || "fallback_secret";

export const cookieStore = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        redirect("/login");
    }

    let payload: jwt.JwtPayload | string | undefined;

    try {
        payload = jwt.verify(token, SECRET_KEY);
    } catch {
        redirect("/login");
    }

    if (typeof payload !== "object" || payload === null || (payload as jwt.JwtPayload).role !== "admin") {
        redirect("/unauthorized");
    }

    return payload as { name: string, email: string };
}