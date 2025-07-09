import Link from "next/link";
import React, { JSX } from "react";
import { Toaster } from "react-hot-toast";

import { getProducts } from "@/app/services";
import { getUserFromToken } from "@/app/libs/node";
import { ProductMain } from "@/app/components/product";
import { IProduct, ProductData, UserPayload } from "@/app/types";

const HomeMenu = async ({ threshold = 3 }: { threshold?: number }): Promise<JSX.Element> => {
    const user: UserPayload | null = await getUserFromToken();
    const productRaw: IProduct[] = await getProducts();

    const raw = JSON.parse(JSON.stringify(productRaw || []));

    const products: ProductData[] = raw
        .slice(0, threshold)
        .map((product: IProduct) => ({
            ID: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            createdAt: new Date(product.createdAt || ""),
            updatedAt: new Date(product.updatedAt || "")
        }));

    return (
        <section
            id="menu"
            className="relative min-h-screen w-full bg-black mb-10"
        >

            <Toaster
                position="top-right"
            />

            <div className="relative w-full max-w-7xl mx-auto text-center px-5 py-20">
                <h1 className="text-4xl font-bold text-lime-600 mb-4">Menu Kami</h1>
                <p className="text-lg text-gray-400 mb-10 italic">
                    &quot;Nikmati pilihan kopi dan teh terbaik kami&quot;
                </p>

                <ProductMain
                    user={user}
                    products={products}
                />

                {/* Link ke halaman products */}
                <div className="mt-10">
                    <Link
                        href="/products"
                        className="inline-block bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
                    >
                        Temukan Menu
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeMenu;