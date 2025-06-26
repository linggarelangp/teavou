import { FooterListData } from "@/app/types/footer";
import Link from "next/link";
import { JSX } from "react";


const footerList: FooterListData[] = [
    {
        name: "About Us",
        link: "#",
    },
    {
        name: "Contact Us",
        link: "#",
    },
    {
        name: "Privacy Policy",
        link: "#",
    },
    {
        name: "Terms & Condition",
        link: "#",
    },
    {
        name: "Return Policy",
        link: "#",
    },
    {
        name: "FAQs & Help",
        link: "#",
    },
];

const FooterShopInfo = (): JSX.Element => {
    return (
        <div className="flex flex-col mb-4 lg:mb-0">
            <h1 className="text-2xl pb-2 lg:pb-5">Shop Info</h1>

            <ul className="space-y-2 text-gray-300">
                {footerList.map((item: FooterListData, index: number) => (
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

export default FooterShopInfo;