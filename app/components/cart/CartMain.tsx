"use client";

import Swal from "sweetalert2";
import { JSX, useEffect } from "react";
import { useRouter } from "next/navigation";

import { UserPayload } from "@/app/types";
import { useCart } from "@/app/hooks/useCart";
import { ITransactionItem } from "@/app/types/transaction";
import { CartList, CartSummary } from "@/app/components/cart";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface Window {
        snap: any;
    }
}

type ResponseData = {
    success: boolean;
    status: number;
    token?: string;
}

const CartMain = ({ user }: { user: UserPayload }): JSX.Element => {
    const { cart, updateQty, handlePaymentSuccess } = useCart();
    const router = useRouter();

    useEffect(() => {
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
        const clientKey = process.env.NEXT_MIDTRANS_CLIENT_KEY! as string;

        const script = document.createElement("script");
        script.src = snapScript;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    })

    const handleQuantityChange = (ID: string, delta: number) => {
        const item = cart.find((item) => item.ID === ID);

        if (!item) return;
        updateQty(item.ID, item.qty + delta);
    };

    const handleCheckout = async () => {
        const dataCart = cart.map((item) => ({
            _id: item.ID,
            name: item.name as string,
            price: Number(item.price),
            quantity: Number(item.qty),
            imageUrl: item.imageUrl as string,
        }));

        const dataTransaction = {
            userId: user._id,
            name: user.name,
            email: user.email,
            items: dataCart as ITransactionItem[],
        };

        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataTransaction),
        });

        const responseData: ResponseData = await response.json();
        if (!responseData.success) {
            console.error("Checkout failed:", responseData);
            return;
        }

        window.snap.pay(responseData.token, {
            onSuccess: () => {
                handlePaymentSuccess();
                router.push("/orders");
            },
            onPending: () => {
                router.push("/");
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.",
                    confirmButtonColor: "#d33",
                    allowOutsideClick: false,
                }).then(() => {
                    router.push("/cart");
                });
            },
            onClose: () => {
                handlePaymentSuccess();
                router.push("/orders");
            },
        });
    };

    return (
        <div className="w-full px-0 lg:px-6 py-10 h-auto overflow-hidden">
            <div className="lg:max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <CartList
                        cart={cart}
                        onQuantityChange={handleQuantityChange}
                    />
                </div>
                <div className="md:col-span-1 lg:mt-10 px-5">
                    <CartSummary
                        cart={cart}
                        onCheckout={handleCheckout}
                    />
                </div>
            </div>
        </div>
    );
};

export default CartMain;
