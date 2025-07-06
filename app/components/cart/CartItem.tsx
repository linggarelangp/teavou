"use client";

import Image from "next/image";
import { CartQuantitySelector } from "@/app/components/cart";
import { JSX } from "react";

type CartItemProps = {
    ID: string;
    name: string;
    price: number;
    qty: number;
    image: string;
    onQuantityChange: (ID: string, delta: number) => void;
};

const CartItem = ({ ID, name, price, qty, image, onQuantityChange, }: CartItemProps): JSX.Element => {
    return (
        <div className="card card-side bg-base-100 shadow mb-4">
            <figure>
                <Image
                    src={image}
                    alt={name}
                    width={200}
                    height={200}
                    className="w-32 h-32 object-cover"
                />
            </figure>
            <div className="card-body flex flex-col justify-between">
                <div className="flex flex-col space-y-2">
                    <h2 className="card-title text-lg font-semibold">{name}</h2>
                </div>
            </div>

            <div className="flex flex-col justify-center items-end p-4 space-y-4">
                <CartQuantitySelector
                    quantity={qty}
                    onIncrease={() => onQuantityChange(ID, +1)}
                    onDecrease={() => onQuantityChange(ID, -1)}
                />

                <p className="font-semibold">IDR {(price * qty).toLocaleString()}</p>
            </div>
        </div>
    );
};

export default CartItem;