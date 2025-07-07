import { JSX } from "react";
import Link from "next/link";


const footerList: { name: string, link: string }[] = [
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
                {footerList.map((item, index: number) => (
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