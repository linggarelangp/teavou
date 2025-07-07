/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { JSX } from "react";

import { CartItem } from "@/app/components/cart";

type CartListProps = {
    cart: any[];
    onQuantityChange: (_id: string, delta: number) => void;
};

const CartList = ({ cart, onQuantityChange, }: CartListProps): JSX.Element => {
    return (
        <div className="space-y-4 mt-10">
            <div className="flex items-center space-x-4 mb-4">
                <h2 className="w-full text-2xl font-bold">Your Shopping Cart</h2>
            </div>
            {cart.length === 0 ? (
                <div className="h-screen flex items-center justify-center">
                    <p className="text-center text-gray-500 text-xl">Your cart is empty.</p>
                </div>
            ) : (
                cart.map((item, key) => (
                    <CartItem
                        key={key}
                        ID={item.ID}
                        name={item.name}
                        price={item.price}
                        qty={item.qty}
                        image={item.imageUrl}
                        onQuantityChange={onQuantityChange}
                    />
                ))
            )}
        </div>
    );
};

export default CartList;
