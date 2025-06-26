import { Product, User } from "@/app/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_DEV

export const getProductData = async (): Promise<Product[]> => {
    //const baseUrl =
    // process.env.NODE_ENV === "development"
    //     ? process.env.NEXT_PUBLIC_BASE_URL_DEV
    //     : process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const response: Response = await fetch(`${baseUrl}/api/product`, {
            method: "GET",
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                errorData?.message || `Error ${response.status}: ${response.statusText}`
            );
        }
        const data = await response.json();
        return data.data as Product[];
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch product data: ${message}`);
    }
};

export const getProductById = async (id: string): Promise<Product | null> => {
    // const baseUrl =
    //     process.env.NODE_ENV === "development"
    //         ? process.env.NEXT_PUBLIC_BASE_URL_DEV
    //         : process.env.NEXT_PUBLIC_BASE_URL;

    try {
        const response: Response = await fetch(`${baseUrl}/api/product/${id}`, {
            method: "GET",
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                errorData?.message || `Error ${response.status}: ${response.statusText}`
            );
        }
        const data = await response.json();
        return data.data as Product;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to fetch product by ID: ${message}`);
    }
}

export const getUsersData = async (): Promise<User[]> => {
    const response: Response = await fetch(`${baseUrl}/api/user`, {
        method: "GET",
        next: { revalidate: 60 },
    });

    const data = await response.json();
    return data.data as User[];
}