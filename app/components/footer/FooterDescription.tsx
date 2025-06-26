import React, { JSX } from "react";

const FooterDescription = (): JSX.Element => {
    return (
        <React.Fragment>
            <h1 className="text-2xl pb-2 lg:pb-5">Why People Like Us!</h1>
            <p className="text-gray-300 font-extralight text-justify">
                Everyone loves us because we have different kinds of tea, especially green tea, black tea and also herbal tea and we also have different kinds of bread.
            </p>
        </React.Fragment>
    );
};

export default FooterDescription;