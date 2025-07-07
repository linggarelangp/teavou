"use client";

import Swal from "sweetalert2";
import { JSX, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/hooks/useCart";

type PayNowButtonProps = {
    snapToken: string;
};

const PayNowButton = ({ snapToken }: PayNowButtonProps): JSX.Element => {

    const { handlePaymentSuccess } = useCart();
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
    }, []);

    const handlePay = () => {
        if (window.snap) {
            window.snap.pay(snapToken, {
                onSuccess: () => {
                    handlePaymentSuccess();
                    router.push("/orders");
                },
                onPending: () => {
                    handlePaymentSuccess();
                    router.push("/orders");
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
            });
        } else {
            alert("Midtrans not loaded yet");
        }
    };

    return (
        <button
            onClick={handlePay}
            className="px-4 py-2 bg-lime-600 text-white rounded hover:bg-lime-700 transition-colors text-sm curson-pointer"
        >
            Pay Now
        </button>
    );
};

export default PayNowButton;
