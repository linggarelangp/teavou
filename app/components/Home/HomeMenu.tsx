import React, { JSX } from "react";
import { Toaster } from "react-hot-toast";

import { getProducts } from "@/app/services";
import { getUserFromToken } from "@/app/libs/node";
import { IProduct, ProductData, UserPayload } from "@/app/types";
import { ProductMain } from "../product";

const HomeMenu = async (): Promise<JSX.Element> => {
    const user: UserPayload | null = await getUserFromToken();
    const productRaw: IProduct[] = await getProducts();

    const raw = JSON.parse(JSON.stringify(productRaw || []));

    const products: ProductData[] = raw.map((product: IProduct) => ({
        ID: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        createdAt: new Date(product.createdAt || ""),
        updatedAt: new Date(product.updatedAt || ""),
    }));

    return (
        <section
            id="menu"
            className="relative h-screen w-full bg-black mb-10"
        >

            <Toaster
                position="top-right"
            />

            <div className="absolute w-full md:max-w-4/5 lg:mx-auto inset-0 text-center px-5">
                <h1 className="text-4xl font-bold text-lime-600 mb-4">Our Menu</h1>
                <p className="text-lg text-gray-400 mb-10 italic">&quot;Discover and enjoy our finest selection of coffee and tea&quot;</p>

                <ProductMain
                    user={user}
                    products={products}
                />
            </div>
        </section>
    )
}

export default HomeMenu