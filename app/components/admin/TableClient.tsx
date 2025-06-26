"use client";

import { JSX } from "react";
import Table from "./Table";
import { Column } from "@/app/types/table";
import { useRouter } from "next/navigation";

type Props<T> = {
    columns: Column<T>[];
    data: T[];
};

export default function TableClient<T extends { _id: string }>({
    columns,
    data }: Props<T>): JSX.Element {
    const router = useRouter();

    const handleUpdate = (row: T) => {
        router.push(`/admin/product/${row._id}/update`);
    }

    const handleDelete = (row: T) => {
        console.log("Delete row:", row);
    };
    return (
        <>
            <Table
                columns={columns}
                data={data}
                itemsPerPage={5}
                onEdit={handleUpdate}
                onDelete={handleDelete}
            />
        </>
    );
}
