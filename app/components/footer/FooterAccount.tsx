import { JSX } from "react";

import { FooterListData } from "@/app/types/footer";
import Link from "next/link";

const footerAccountList: FooterListData[] = [
    {
        name: "My Account",
        link: "#",
    },
    {
        name: "Shop details",
        link: "#",
    },
    {
        name: "Shopping Cart",
        link: "#",
    },
    {
        name: "Order History",
        link: "#",
    },
];

const FooterAccount = (): JSX.Element => {
    return (
        <div className="flex flex-col mb-4 lg:mb-0">
            <h4 className="text-2xl pb-2 lg:pb-5">Account</h4>

            <ul className="space-y-2 text-gray-300">
                {footerAccountList.map((item: FooterListData, index: number) => (
                    <li
                        key={index}
                        className="font-extralight hover:text-white"
                    >
                        <Link
                            href={item.link}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterAccount;