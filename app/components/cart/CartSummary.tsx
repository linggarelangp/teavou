"use client";

import Link from "next/link";
import React, { JSX, useMemo } from "react";

type CartSummaryProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cart: any[];
    onCheckout: () => void;
};

const CartSummary = ({ cart, onCheckout, }: CartSummaryProps): JSX.Element => {
    const subtotal = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    }, [cart]);

    return (
        <div className="p-6 rounded-box space-y-4 shadow-md dark:shadow-lg w-full border">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Order Summary</h2>

            <div className="space-y-3">
                {cart.map((item, index) => (
                    <div key={item._id || index} className="flex justify-between items-center border-b pb-2">
                        <div className="text-sm text-gray-700 dark:text-gray-200">{item.name}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <span className="text-gray-800 dark:text-white font-semibold">{item.qty}</span>
                            <span className="text-gray-800 dark:text-white font-semibold">x</span>
                            <span className="text-gray-800 dark:text-white font-semibold">
                                IDR {new Intl.NumberFormat("id-ID").format(item.price || 0)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between text-sm text-gray-800 dark:text-white font-semibold pt-2">
                <span>Items ({cart.length})</span>
                <span>IDR {new Intl.NumberFormat("id-ID").format(subtotal)}</span>
            </div>

            <div className="divider my-2" />

            <div className="flex justify-between font-bold text-lg text-gray-800 dark:text-white">
                <span>Total</span>
                <span>IDR {new Intl.NumberFormat("id-ID").format(subtotal)}</span>
            </div>

            {cart.length >= 1 && (
                <React.Fragment>
                    <Link
                        href="/product"
                        className="btn bg-transparent border-orange-600 hover:bg-orange-600 text-white w-full mt-4 mb-2 rounded-2xl shadow"

                    >
                        Continue Shopping
                    </Link>

                    <button
                        className="btn bg-lime-500 hover:bg-lime-600 text-white w-full rounded-2xl shadow"
                        onClick={onCheckout}
                    >
                        Checkout
                    </button>
                </React.Fragment>
            )}
        </div>

    );
};

export default CartSummary;