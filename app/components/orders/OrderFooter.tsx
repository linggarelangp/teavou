import { JSX } from "react";
import { FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

type OrderFooterProps = {
    amount: number;
    createdAt: string | Date;
};

const OrderFooter = ({ amount, createdAt }: OrderFooterProps): JSX.Element => {
    const date = new Date(createdAt).toLocaleDateString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm pt-2 border-t border-gray-400 mt-4 gap-2">
            <div className="font-semibold text-lg flex items-center gap-1">
                <FaMoneyBillWave /> Total: <span className="">Rp{amount.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
                <FaCalendarAlt /> Ordered on: <span>{date}</span>
            </div>
        </div>
    );
};

export default OrderFooter;
