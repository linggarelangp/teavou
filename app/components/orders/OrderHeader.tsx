import { JSX } from "react";
import { TbInvoice } from "react-icons/tb";

type OrderHeaderProps = {
    orderId: string;
    status: string;
};

const OrderHeader = ({ orderId, status }: OrderHeaderProps): JSX.Element => {
    const statusColor = {
        pending: "bg-yellow-400 text-white",
        success: "bg-green-500 text-white",
        failed: "bg-red-500 text-white",
        cancelled: "bg-gray-500 text-white"
    };

    return (
        <div className="flex items-start justify-between">
            <h2 className="text-md sm:text-lg font-semibold flex gap-1 items-center">
                <TbInvoice className="text-xl text-gray-500" /> Order ID: <span className="break-all">{orderId}</span>
            </h2>
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[status as keyof typeof statusColor]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        </div>
    );
};

export default OrderHeader;
