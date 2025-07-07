import React, { JSX } from "react";

import { TableCell } from "@/app/components/Table";

interface TableBodyProps<T> {
    columns: { header: string; accessor: keyof T }[];
    data: T[];
    startIndex: number
    onUpdate?: (row: T) => void;
    onDelete?: (row: T) => void;
};

function TableBody<T>({ columns, data, startIndex, onUpdate, onDelete }: TableBodyProps<T>): JSX.Element {
    const hasActions = onUpdate || onDelete;

    const isImageUrl = (value: string): boolean => {
        return typeof value === "string" && /^https?:\/\/.*\.(jpg|jpeg|png|webp)$/.test(value as string);
    };
    return (
        <tbody>
            {
                (!data || data.length === 0) ? (
                    <tr>
                        <td colSpan={columns.length + (hasActions ? 1 : 0)} className="text-center">
                            No data available
                        </td>
                    </tr>
                ) : (
                    data.map((row, key) => (
                        <tr key={key}>
                            <td className="font-semibold text-center">
                                {startIndex + key + 1}
                            </td>
                            {columns.map((column, key) => (
                                <td
                                    key={key}
                                    className={`px-4 py-2 text-center overflow-hidden text-ellipsis whitespace-nowrap ${isImageUrl(row[column.accessor] as string) ? "flex items-center justify-center" : ""}`}
                                >
                                    {TableCell(row[column.accessor], column.accessor as string)}
                                </td>
                            ))}

                            {hasActions && (
                                <td className="space-y-1 text-center">
                                    {onUpdate && (
                                        <button
                                            onClick={() => onUpdate(row)}
                                            className="w-3/5 btn btn-sm btn-primary rounded-2xl"
                                        >
                                            Update
                                        </button>
                                    )}

                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(row)}
                                            className="w-3/5 btn btn-sm btn-error rounded-2xl mb-4"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))
                )
            }
        </tbody>
    );
};

export default TableBody;