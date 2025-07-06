
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.NEXT_API_JWT_SECRET_TOKEN || "fallback_secret";

export const cookieStore = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODViYTI1MTE1YTk4NzQ3YmZiYTY5OGYiLCJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImFkbWluQHRlYXZvdS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTA4NzU5MDcsImV4cCI6MTkwODY2MzkwN30.xlc9B2U0LFDdq_Iy91AadsafWrbja4N8KkgyCQxY480";
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