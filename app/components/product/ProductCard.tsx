"use client";

import Image from "next/image";
import Swal from "sweetalert2";
import React, { JSX, useMemo } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

import { UserPayload } from "@/app/types";
import { ProductData } from "@/app/types/product";

interface ProductCardProps {
    user: UserPayload | null;
    product: ProductData;
    onAddToCart: (product: ProductData) => void;
};

const ProductCard = ({ user, product, onAddToCart }: ProductCardProps): JSX.Element => {
    const router = useRouter();

    const fakeOriginalPrice = useMemo(() => {
        return product.price + Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
    }, [product.price]);

    const handleAddToCart = () => {
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "You need to login to add products to your cart.",
                confirmButtonText: "Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/login");
                }
            });
            return;
        }

        toast.success(`${product.name} has been added to cart`, {
            position: "top-right",
            duration: 1000,
        });

        onAddToCart(product);
    };

    return (
        <div className="card bg-base-100 shadow-md hover:shadow-lg transition duration-200">
            <figure>
                <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-72 bg-cover object-cover"
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-gray-600">{product.name}</h2>
                <p className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                    {product.description}
                </p>
                <div className="w-full card-actions justify-between flex-col lg:flex-row items-center mt-4">
                    <div className="text-start">
                        <p className="relative text-red-500 text-sm lg:text-base italic custom-strike">
                            IDR <span>{fakeOriginalPrice.toLocaleString()}</span>
                        </p>

                        <p className="text-start text-lime-600 text-base lg:text-xl font-semibold">
                            IDR <span>{product.price.toLocaleString()}</span>
                        </p>
                    </div>
                    <button
                        className="btn text-lime-600 hover:text-white border-lime-400 hover:border-orange-600 bg-transparent hover:bg-orange-600 rounded-xl transition-colors duration-300 ease-in-out"
                        onClick={handleAddToCart}
                    >
                        <p className="flex items-center gap-2">
                            <CiShoppingCart className="text-xl" />
                            <span>Add to Cart</span>
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;