import React, { JSX } from "react";

import { Toaster } from "react-hot-toast";
import { getProducts } from "@/app/services";
import { Footer } from "@/app/components/Footer";
import { getUserFromToken } from "@/app/libs/node";
import { IProduct, ProductData } from "@/app/types";
import { Navbar } from "@/app/components/navigation";
import { ProductMain } from "@/app/components/product";

const ProductPage = async (): Promise<JSX.Element> => {
    const user = await getUserFromToken();
    const productRaw: IProduct[] = await getProducts();

    const raw = JSON.parse(JSON.stringify(productRaw || []));

    const products: ProductData[] = raw.map((product: IProduct) => ({
        ID: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        createdAt: new Date(product.createdAt || ""),
        updatedAt: new Date(product.updatedAt || "")
    }));

    return (
        <React.Fragment>
            <header>
                <Navbar token={user} />
            </header>

            <main className="w-full min-h-screen overflow-hidden bg-black py-24 px-4">
                <Toaster position="top-right" />

                <section id="menu" className="max-w-6xl mx-auto text-center space-y-10">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-lime-600 mb-4">
                            Our Menu
                        </h1>
                        <p className="text-lg text-gray-400 italic max-w-xl mx-auto">
                            &quot;Discover and enjoy our finest selection of coffee and tea&quot;
                        </p>
                    </div>

                    {/* Product List */}
                    <ProductMain user={user} products={products} />
                </section>
            </main>

            <footer>
                <Footer />
            </footer>
        </React.Fragment>
    );
};

export default ProductPage;