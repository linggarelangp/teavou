"use client";

import React, { JSX } from "react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import Table from "@/app/components/table/Table";

import { Column } from "@/app/types/table";

type Props<T> = {
    columns: Column<T>[];
    data: T[];
};

export default function TableClient<T extends { _id?: string, name?: string, role?: string }>({
    columns,
    data }: Props<T>): JSX.Element {
    const router = useRouter();

    const handleUpdate = (row: T) => {
        router.push(`/admin/product/${row._id}/update`);
    }

    const handleDelete = async (row: T) => {
        const result = await Swal.fire({
            title: `Delete Product ${row.name ?? "this product"}?`,
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/product/${row._id}`, {
                    method: "DELETE",
                });

                if (!response.ok) throw new Error("Failed to delete product");

                Swal.fire({
                    icon: "success",
                    text: "Product has been deleted.",
                    title: "Deleted!",
                    confirmButtonText: "OK",
                }).then(() => {
                    router.push("/admin/product");
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error instanceof Error ? error.message : "Unknown error occurred",
                });
            };
        };
    };

    return (data && data.length > 0 && data[0].role) ? (
        <Table
            columns={columns}
            data={data}
            itemsPerPage={5}
        />
    ) : (
        <Table
            columns={columns}
            data={data}
            itemsPerPage={5}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
    );
}
