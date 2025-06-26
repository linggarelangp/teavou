import { JSX } from "react";
import Link from "next/link";
import { FooterSocialMediaData } from "@/app/types/footer";

const FooterSocialMediaList = ({ name, link, icon }: FooterSocialMediaData): JSX.Element => {
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