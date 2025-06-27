import { Product, User } from "@/app/types";
import { cookies } from "next/headers";

const baseUrl: string = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? process.env.NEXT_PUBLIC_BASE_URL_DEV!
    : process.env.NEXT_PUBLIC_BASE_URL!;

export const getProductData = async (revalidate: number): Promise<Product[]> => {
    try {
        const response: Response = await fetch(`${baseUrl}/api/product`, {
            method: "GET",
            next: { revalidate: revalidate },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                errorData?.message || `Error ${response.status}: ${response.statusText}`
            );
        };

        const data = await response.json();
        return data.data as Product[];
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch product data: ${message}`);
    };
};

export const getProductById = async (id: string, revalidate: number): Promise<Product | null> => {
    try {
        const response: Response = await fetch(`${baseUrl}/api/product/${id}`, {
            method: "GET",
            next: { revalidate: revalidate },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                errorData?.message || `Error ${response.status}: ${response.statusText}`
            );
        };
        const data = await response.json();
        return data.data as Product;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch product by ID: ${message}`);
    };
};

export const getUsersData = async (revalidate: number): Promise<User[]> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const response: Response = await fetch(`${baseUrl}/api/user`, {
        method: "GET",
        next: { revalidate: revalidate },
        headers: {
            Cookie: `token=${token}`,
        },
        cache: "no-store",
    });

    const data = await response.json();
    return data.data as User[];
};

export const getUserByRole = async (role: string, revalidate: number): Promise<User[]> => {
    const response: Response = await fetch(`${baseUrl}/api/user/role/${role}`, {
        method: "GET",
        next: { revalidate: revalidate },
    });

    const data = await response.json();
    return data.data as User[];
};