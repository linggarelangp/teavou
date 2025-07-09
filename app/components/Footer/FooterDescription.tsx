import React, { JSX } from "react";

const FooterDescription = (): JSX.Element => {
    return (
        <React.Fragment>
            <h3 className="text-2xl pb-2 lg:pb-5">Kenapa Orang Menyukai Kami</h3>
            <p className="text-gray-300 font-extralight text-justify">
                Semua orang menyukai kami karena kami mempunyai berbagai jenis teh, terutama teh hijau, teh hitam, dan juga teh herbal dan kami juga mempunyai berbagai jenis roti.
            </p>
        </React.Fragment>
    );
};

export default FooterDescription;