import React, { JSX } from "react";
import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";

import FooterSocialMediaList from "@/app/components/Footer/FooterSocialMediaList";

const footerSocialMedia: { name: string, link: string, icon: JSX.Element }[] = [
    {
        name: "Facebook",
        link: "https://www.facebook.com/",
        icon: <FaFacebookF className="text-2xl lg:text-3xl text-orange-400" />,
    },
    {
        name: "Instagram",
        link: "https://www.instagram.com/linggarelangp/",
        icon: <FaInstagram className="text-2xl lg:text-3xl text-orange-400" />,
    },
    {
        name: "X Twitter",
        link: "https://x.com/",
        icon: <FaXTwitter className="text-2xl lg:text-3xl text-orange-400" />,
    },
];

const FooterHead = (): JSX.Element => {
    return (
        <React.Fragment>
            <div className="flex flex-col text-center lg:text-start lg:flex-row w-full px-4 py-3 mx-auto lg:px-8">
                <div className="container flex flex-col mb-3 lg:mb-0 select-none">
                    <p className="text-5xl text-lime-400">Teavou</p>
                    <p className="text-lg text-orange-400 pl-0 lg:pl-12">Tea Products</p>
                </div>

                <ul className="flex justify-center items-center space-x-2 lg:space-x-4 pr-0 cursor-pointer">
                    {footerSocialMedia.map((item, index: number) => (
                        <FooterSocialMediaList
                            key={index}
                            name={item.name}
                            link={item.link}
                            icon={item.icon}
                        />
                    ))}
                </ul>
            </div>

            <div className="container px-4 border border-orange-400 mb-3 mx-auto"></div>
        </React.Fragment>
    );
};

export default FooterHead;