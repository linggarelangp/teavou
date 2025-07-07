"use client";

import { JSX } from "react";
import { TbInvoice } from "react-icons/tb";
import { FaShoppingCart, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";

import Image from "next/image";
import { ITransaction } from "@/app/types/transaction";
import PayNowButton from "../Button/PayNowButton";

type OrdersProps = {
    transaction: ITransaction[];
};

const OrdersMain = ({ transaction }: OrdersProps): JSX.Element => {
    const isPendingAndRecent = (trx: ITransaction) => {
        if (trx.status !== "pending") return false;
        const now = new Date();
        const created = new Date(trx!.createdAt!);
        const timeDiff = now.getTime() - created.getTime();
        return timeDiff < 24 * 60 * 60 * 1000;
    };

    const statusColor = {
        pending: "bg-yellow-400 text-white",
        success: "bg-green-500 text-white",
        failed: "bg-red-500 text-white",
        cancelled: "bg-gray-500 text-white"
    };

    return (
        <div className="w-full min-h-screen px-4 py-6 sm:px-8 bg-base-200">
            <h1 className="text-3xl text-lime-500 font-bold flex items-center gap-2 mb-2">
                <FaShoppingCart /> My Orders
            </h1>
            <p className="mb-6 text-gray-600 text-sm">
                You have {transaction.length} order(s).
            </p>

            <div className="space-y-6">
                {transaction.map((trx: ITransaction, key: number) => {
                    const date = new Date(trx.createdAt || "").toLocaleDateString("id-ID", {
                        day: "numeric", month: "short", year: "numeric"
                    });

                    return (
                        <div key={key} className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 space-y-3 relative">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <h2 className="text-md sm:text-lg font-semibold flex gap-1 items-center">
                                    <TbInvoice className="text-xl text-gray-500" /> Order ID: <span className="break-all">{trx.orderId}</span>
                                </h2>
                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[trx.status as keyof typeof statusColor]}`}>
                                    {trx.status.charAt(0).toUpperCase() + trx.status.slice(1)}
                                </span>
                            </div>

                            {/* Items */}
                            <div className="space-y-3">
                                {trx.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <Image
                                            src={item.imageUrl || "https://res.cloudinary.com/djfgwiy1i/image/upload/v1750945109/products/rzyhx2r9y8xp9zbegr6q.jpg"}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                                        />
                                        <div className="text-sm sm:text-base">
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-gray-600">
                                                Rp{item.price.toLocaleString("id-ID")} × {item.quantity} = <span className="font-semibold text-black">Rp{item.subtotal.toLocaleString("id-ID")}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-700 pt-2 border-t border-gray-100 mt-4 gap-2">
                                <div className="font-semibold text-lg flex items-center gap-1">
                                    <FaMoneyBillWave /> Total: <span className="text-black">Rp{trx.amount.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500">
                                    <FaCalendarAlt /> Ordered on: <span>{date}</span>
                                </div>
                            </div>

                            {/* Pay Now Button (conditional) */}
                            {isPendingAndRecent(trx) && (
                                <div className="pt-4">
                                    <PayNowButton snapToken={trx.snapToken!} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrdersMain;
