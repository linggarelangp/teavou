"use client";

import React, { JSX, useState } from "react";

import { TablePagination, TableHead, TableBody, TableFooter } from "@/app/components/Table";

interface TableProps<T> {
    columns: { header: string; accessor: keyof T; }[];
    data: T[];
    itemsPerPage: number;
    onUpdate?: (row: T) => void;
    onDelete?: (row: T) => void;
};

function Table<T>({ columns, data, onUpdate, onDelete, itemsPerPage = 5 }: TableProps<T>): JSX.Element {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const paginatedData = data?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="overflow-hidden text-ellipsis shadow-lg rounded-2xl pb-5">
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            />

            <table className="table table-xs">
                <TableHead<T>
                    columns={columns}
                    hasActions={onUpdate || onDelete ? true : false}
                />

                <TableBody<T>
                    columns={columns}
                    data={paginatedData || []}
                    startIndex={(currentPage - 1) * itemsPerPage}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />

                <TableFooter<T>
                    columns={columns}
                    hasActions={onUpdate || onDelete ? true : false}
                />
            </table>
        </div>
    );
};

export default Table;