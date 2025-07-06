import React, { JSX } from "react";

interface TableHeadProps<T> {
    columns: { header: string; accessor: keyof T }[];
    hasActions: boolean;
};

function TableHead<T>({ columns, hasActions }: TableHeadProps<T>): JSX.Element {
    return (
        <thead>
            <tr>
                <th className="text-center">No</th>
                {columns.map((column, key) => (
                    <th key={key} className="text-center">
                        {column.header}
                    </th>
                ))}

                {hasActions && <th className="text-center">Actions</th>}
            </tr>
        </thead>
    );
};

export default TableHead;