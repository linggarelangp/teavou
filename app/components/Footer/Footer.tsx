import { JSX } from "react";

import { FooterHead, FooterBody, FooterEnd } from "@/app/components/Footer";

const Footer = (): JSX.Element => {
    return (
        <div className="bg-zinc-900 select-none">
            <FooterHead />
            <FooterBody />
            <FooterEnd />
        </div>
    );
};

export default Footer;