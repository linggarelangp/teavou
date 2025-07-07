import { JSX } from "react";
import Image from "next/image";

type Item = {
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    imageUrl: string;
};

type OrderItemProps = {
    items: Item[];
};

const OrderItems = ({ items }: OrderItemProps): JSX.Element => {
    return (
        <div className="space-y-3">
            {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                    <Image
                        src={item.imageUrl || "/default.jpg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                    />

                    <div className="text-sm sm:text-base">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-600">
                            Rp{item.price.toLocaleString("id-ID")} × {item.quantity} ={" "}
                            <span className="font-semibold text-black">
                                Rp{item.subtotal.toLocaleString("id-ID")}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderItems;
