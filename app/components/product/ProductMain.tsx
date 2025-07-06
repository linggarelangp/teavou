"use client";

import React, { JSX } from "react";

import { UserPayload } from "@/app/types";
import { useCart } from "@/app/hooks/useCart";
import { ProductData } from "@/app/types/product";
import { ProductCard } from "@/app/components/product";

interface ProductMainProps {
    user: UserPayload | null;
    products: ProductData[];
};

const ProductMain = ({ user, products }: ProductMainProps): JSX.Element => {
    const { addToCart } = useCart();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
                <ProductCard
                    key={idx}
                    product={product}
                    user={user}
                    onAddToCart={addToCart}
                />
            ))}
        </div>
    );
};

export default ProductMain;