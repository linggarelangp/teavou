import { JSX } from "react";

import { FooterDescription, FooterShopInfo, FooterAccount, FooterContact } from "@/app/components/Footer";

const FooterBody = (): JSX.Element => {
    return (
        <div className="flex flex-wrap w-full justify-center px-4 py-3 mx-auto lg:px-8 text-white">
            <div className="w-full sm:w-1/4 flex flex-col mb-4 lg:mb-0">
                <FooterDescription />
            </div>

            <div className="w-full flex flex-1 flex-col lg:flex-row justify-around">
                <FooterShopInfo />
                <FooterAccount />
                <FooterContact />
            </div>
        </div>
    );
};

export default FooterBody;