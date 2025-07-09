"use client";

import React, { JSX } from "react";

const ButtonReport = (): JSX.Element => {

    const handleDownloadReport = async () => {
        const link = document.createElement("a");
        link.href = "/api/transaction/download";
        link.download = "laporan-transaction.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <div className="mb-4">
            <button
                onClick={handleDownloadReport}
                className="btn btn-sm border-none shadow-none bg-lime-500 hover:bg-lime-700 transition-colors duration-300 ease-in-out"
            >
                Download Laporan
            </button>
        </div>
    )
}

export default ButtonReport