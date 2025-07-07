import React, { JSX } from "react";
import Image from 'next/image';

const TableCell = (value: unknown, accessor: string): JSX.Element | string => {
    if (typeof value === "string" && /^https?:\/\/.*\.(jpg|jpeg|png|webp)$/.test(value as string)) {
        return (
            <Image
                src={value}
                alt="preview"
                width={150}
                height={150}
                loading="lazy"
                className="w-24 h-24 object-cover rounded"
            />
        );
    }

    if (accessor === "description" || accessor === "ID") {
        return String(value) ? String(value).slice(0, 10) + "..." : "";
    }

    if ((typeof value === "string" && !isNaN(Date.parse(value))) || value instanceof Date) {
        const d = new Date(value);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return String(value ?? "-");
};

export default TableCell;