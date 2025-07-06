"use client";

import React, { JSX } from "react";

type QuantitySelectorProps = {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
};

const QuantitySelector = ({ quantity, onIncrease, onDecrease, }: QuantitySelectorProps): JSX.Element => {
    return (
        <div className="join">
            <button
                className="btn btn-sm join-item"
                onClick={onDecrease}
                aria-label="Decrease quantity"
            >
                -
            </button>

            <button className="btn btn-sm join-item no-animation cursor-default">
                {quantity}
            </button>

            <button
                className="btn btn-sm join-item"
                onClick={onIncrease}
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
