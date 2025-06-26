"use client";
import Image from "next/image";
import React, { JSX, useState } from "react";
import { Column } from "@/app/types/table";

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    itemsPerPage?: number;
};

export default function Table<T extends object>({
    columns,
    data,
    onEdit,
    onDelete,
    itemsPerPage = 5,
}: TableProps<T>): JSX.Element {
    const hasActions = onEdit || onDelete;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const shortenId = (id: string) => id.slice(0, 6) + "..." + id.slice(-4);

    return (
        <div className="overflow-hidden text-ellipsis shadow-lg rounded-2xl">
            <table className="table table-xs">
                <thead className="">
                    <tr>
                        {columns.map((column, key) => (
                            <th key={key} className="px-4 py-2 font-semibold text-center">
                                {column.header}
                            </th>
                        ))}
                        {hasActions && (
                            <th className="px-4 py-2 font-semibold text-center">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (hasActions ? 1 : 0)}
                                className="text-center py-4 text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map((row, i) => (
                            <tr key={i} className="bg-gray-50">
                                {columns.map((column, key) => (
                                    <td
                                        key={key}
                                        className={`px-4 py-2 text-center overflow-hidden text-ellipsis whitespace-nowrap ${typeof row[column.accessor] === "string" &&
                                            /^https?:\/\/.*\.(jpg|jpeg|png|webp)$/.test(row[column.accessor] as string) ? "flex items-center justify-center" : ""}`}
                                    >
                                        {typeof row[column.accessor] === "string" &&
                                            /^https?:\/\/.*\.(jpg|jpeg|png|webp)$/.test(row[column.accessor] as string) ? (
                                            <Image
                                                src={row[column.accessor] as string}
                                                alt="preview"
                                                width={150}
                                                height={150}
                                                loading="lazy"
                                                className="w-24 h-24 bg-center object-cover rounded justify-center"
                                            />
                                        ) : (
                                            column.accessor === "id" || column.accessor === "_id"
                                                ? shortenId(String(row[column.accessor]))
                                                : String(row[column.accessor] ?? "-")
                                        )}
                                    </td>
                                ))}

                                {hasActions && (
                                    <td className="space-y-1 text-center">
                                        {onEdit && (
                                            <button
                                                onClick={() => onEdit(row)}
                                                className="w-3/5 btn btn-sm btn-primary hover:underline rounded-2xl"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => onDelete(row)}
                                                className="w-3/5 btn btn-sm btn-error hover:underline rounded-2xl"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center items-center gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
