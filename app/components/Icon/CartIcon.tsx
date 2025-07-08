"use client";
import { JSX } from "react";

import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

import { useCart } from "@/app/hooks/useCart";

const CartIcon = (): JSX.Element => {
    const { totalQty } = useCart();

    return (
        <Link
            href="/cart"
            prefetch={false}
            aria-label="Cart"
            className="relative"
        >
            <FaCartShopping className="text-xl lg:text-2xl text-lime-400" />
            {totalQty > 0 && (
                <span className="absolute -top-[6px] -right-2 bg-orange-400 text-white pl-0.5 text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{totalQty}</span>
            )}
        </Link>
    );
};

export default CartIcon;
