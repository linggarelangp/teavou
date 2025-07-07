import React, { JSX } from "react";
import { Toaster } from "react-hot-toast";

import { Footer } from "@/app/components/Footer";
import { Navbar } from "@/app/components/navigation";
import { ProductMain } from "@/app/components/product";
import { getUserFromToken } from "@/app/libs/node/auth";
import { getProducts } from "@/app/services/productServices";
import { IProduct, ProductData, UserPayload } from "@/app/types";


const ProductPage = async (): Promise<JSX.Element> => {
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
        <React.Fragment>
            <header>
                <Navbar />
            </header>

            <Toaster
                position="top-right"
            />

            <main className="min-h-screen">
                <section className="container mx-auto px-4 py-10 text-center">
                    <h1 className="text-4xl font-bold text-lime-600 mb-4">SHOP</h1>
                    <p className="text-lg text-gray-600 mb-10 italic">&quot;Discover and enjoy our finest selection of coffee and tea&quot;</p>

                    <ProductMain
                        user={user}
                        products={products}
                    />
                </section>
            </main>

            <footer>
                <Footer />
            </footer>
        </React.Fragment>
    );
};

export default ProductPage;