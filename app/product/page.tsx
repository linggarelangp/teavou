import React, { JSX } from "react";
import { Toaster } from "react-hot-toast";

import { Footer } from "@/app/components/Footer";
import { getUserFromToken } from "@/app/libs/node/auth";
import { Navbar } from "@/app/components/navigation";
import { ProductMain } from "@/app/components/product";
import { IProduct, ProductData } from "@/app/types/product";
import { getProducts } from "@/app/services/productServices";


const ProductPage = async (): Promise<JSX.Element> => {
    const user = await getUserFromToken();
    const productRaw = await getProducts();

    const raw = JSON.parse(JSON.stringify(productRaw || []));

    const products: ProductData[] = raw.map((product: IProduct) => ({
        ID: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.imageUrl,
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
            <Footer />
        </React.Fragment>
    );
};

export default ProductPage;