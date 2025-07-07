import { JSX } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";

import { UserPayload } from "@/app/types";
import { getUserFromToken } from "@/app/libs/node";
import { OrderCard } from "@/app/components/orders";
import { ITransaction } from "@/app/types/transaction";
import { getTransactionByUserId } from "@/app/services";

const OrdersPage = async (): Promise<JSX.Element> => {
    const raw: UserPayload | null = await getUserFromToken();
    const user = raw ? JSON.parse(JSON.stringify(raw)) : null;

    if (!user) redirect("/login");

    const transactionRaw: ITransaction[] = await getTransactionByUserId(user._id);

    if (!transactionRaw || transactionRaw.length === 0) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <h1 className="text-2xl">No orders found.</h1>

                <Link
                    href={"/products"}
                    className="mt-4 px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-700 transition-colors"
                >
                    Go to Products
                </Link>
            </div>
        );
    };

    const transaction = JSON.parse(JSON.stringify(transactionRaw));
    return (
        <div className="w-full min-h-screen px-4 py-6 sm:px-8 bg-base-200">
            <h1 className="text-3xl text-lime-500 font-bold flex items-center gap-2 mb-2">
                <FaShoppingCart /> My Orders
            </h1>
            <p className="mb-6 text-gray-600 text-sm">
                You have {transaction.length} order(s).
            </p>

            <div className="space-y-6">
                {transaction.map((trx: ITransaction, key: number) => (
                    <OrderCard key={key} transaction={trx} />
                ))}
            </div>
        </div>
    );
};

export default OrdersPage;