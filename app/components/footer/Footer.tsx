import { JSX } from "react";

import FooterHead from "@/app/components/footer/FooterHead";
import FooterBody from "@/app/components/footer/FooterBody";
import FooterEnd from "@/app/components/footer/FooterEnd";

const Footer = (): JSX.Element => {
    return (
        <div className="bg-gray-800 select-none">
            <FooterHead />
            <FooterBody />
            <FooterEnd />
        </div>
    );
};

export default Footer;