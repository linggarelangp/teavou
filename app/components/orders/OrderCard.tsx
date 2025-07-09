import { JSX } from "react";
import { ITransaction } from "@/app/types/transaction";

import PayNowButton from "@/app/components/Button/PayNowButton";
import { OrderHeader, OrderItem, OrderFooter } from "@/app/components/orders"

type OrderCardProps = {
    transaction: ITransaction;
};

const OrderCard = ({ transaction }: OrderCardProps): JSX.Element => {
    const isPendingAndRecent = () => {
        if (transaction.status !== "pending") return false;
        const now = new Date();
        const created = new Date(transaction.createdAt!);
        return now.getTime() - created.getTime() < 24 * 60 * 60 * 1000;
    };

    return (
        <div className="bg-zinc-900 rounded-xl shadow-lg p-5 border border-zinc-800 space-y-3 relative">
            <OrderHeader
                orderId={transaction.orderId}
                status={transaction.status}
            />

            <OrderItem items={transaction.items} />

            <OrderFooter
                amount={transaction.amount}
                createdAt={transaction.createdAt as string}
            />

            {isPendingAndRecent() && (
                <div className="pt-4">
                    <PayNowButton snapToken={transaction.snapToken!} />
                </div>
            )}
        </div>
    );
};

export default OrderCard;
