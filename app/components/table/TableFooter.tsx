import React, { JSX } from "react";

interface TableFooterProps<T> {
    columns: { header: string; accessor: keyof T }[];
    hasActions: boolean;
};

function TableFooter<T>({ columns, hasActions }: TableFooterProps<T>): JSX.Element {
    return (
        <tfoot>
            <tr>
                <th className="text-center">No</th>
                {columns.map((column, key) => (
                    <th key={key} className="text-center">
                        {column.header}
                    </th>
                ))}

                {hasActions && <th className="text-center">Actions</th>}
            </tr>
        </tfoot>
    );
};

export default TableFooter;