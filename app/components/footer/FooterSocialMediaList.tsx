import { JSX } from "react";
import Link from "next/link";

const FooterSocialMediaList = ({ name, link, icon }: { name: string, link: string, icon: JSX.Element }): JSX.Element => {
    return (
        <li
            data-testid={name}
        >
            <Link
                href={link || "#"}
                target="_blank"
                rel="noopener noreferrer"
            >
                {icon}
            </Link>
        </li>
    );
};


export default FooterSocialMediaList;