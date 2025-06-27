"use client";
import Image from "next/image";
import React, { JSX, useState } from "react";

import { Column } from "@/app/types/table";

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    onUpdate?: (row: T) => void;
    onDelete?: (row: T) => void;
    itemsPerPage?: number;
};

export default function Table<T extends object>({
    columns,
    data,
    onUpdate,
    onDelete,
    itemsPerPage = 5,
}: TableProps<T>): JSX.Element {
    const hasActions = onUpdate || onDelete;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const paginatedData = data?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const shortendValues = (value: string) => !value ? value?.slice(0, 10) + "..." : "";

    return (
        <div className="overflow-hidden text-ellipsis shadow-lg rounded-2xl">
            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="w-full flex justify-end">
                    <div className="w-64 join">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="join-item btn">
                            «
                        </button>
                        <div className="w-32 join-item btn">{`Page ${currentPage} of ${totalPages}`}</div>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="join-item btn"
                        >
                            »
                        </button>
                    </div>
                </div>
            )}

            <table className="table table-xs">
                <thead className="">
                    <tr>
                        {columns.map((column, key) => (
                            column.header !== "ID" && (
                                <th key={key} className="px-4 py-2 font-semibold text-center">
                                    {column.header}
                                </th>
                            )
                        ))}
                        {hasActions && (
                            <th className="px-4 py-2 font-semibold text-center">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData?.length === 0 || !paginatedData ? (
                        <tr>
                            <td
                                colSpan={columns.length + (hasActions ? 1 : 0)}
                                className="text-center py-4 text-gray-500"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        paginatedData?.map((row, i) => (
                            <tr key={i} className="bg-gray-50">
                                {columns.map((column, key) => (
                                    column.header !== "ID" && (
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
                                                column.accessor === "description" || column.accessor === "_id"
                                                    ? shortendValues(String(row[column.accessor]))
                                                    : String(row[column.accessor] ?? "-")
                                            )}
                                        </td>
                                    )
                                ))}

                                {hasActions && (
                                    <td className="space-y-1 text-center">
                                        {onUpdate && (
                                            <button
                                                onClick={() => onUpdate(row)}
                                                className="w-3/5 btn btn-sm btn-primary hover:underline rounded-2xl"
                                            >
                                                Update
                                            </button>
                                        )}
                                        {onDelete && (
                                            <button
                                                onClick={() => onDelete(row)}
                                                className="w-3/5 btn btn-sm btn-error hover:underline rounded-2xl mb-4"
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
        </div>
    );
}
