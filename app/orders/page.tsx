import Link from "next/link";
import React, { JSX } from "react";

import { getUserFromToken } from "@/app/libs/node";
import { getTransactionByUserId } from "@/app/services";
import OrdersMain from "@/app/components/orders/OrdersMain";

const OrdersPage = async (): Promise<JSX.Element> => {
    const raw = await getUserFromToken();

    if (!raw) {
        return (
            <div className="flex items-center justify-center flex-col h-screen">
                <h1 className="text-2xl">You must be logged in to view your orders.</h1>
                <p className="mt-2">Please log in to see your orders.</p>
                <Link
                    href="/login"
                    className="mt-4 px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-700 transition-colors"
                >
                    Go to Login
                </Link>
            </div>
        );
    };

    const user = JSON.parse(JSON.stringify(raw));

    const transactionRaw = await getTransactionByUserId(user._id);

    if (!transactionRaw || transactionRaw.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">No orders found.</h1>
            </div>
        );
    };

    const transaction = JSON.parse(JSON.stringify(transactionRaw));

    // transaction.forEach((item: ITransaction) => {
    //     item.items.forEach((item) => {
    //         console.log("Item:", item);
    //     });
    // });

    return <OrdersMain transaction={transaction} />;
};

export default OrdersPage;