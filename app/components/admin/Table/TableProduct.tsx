"use client";

import Swal from "sweetalert2";
import React, { JSX } from "react";

import { useRouter } from "next/navigation";
import { Table } from "@/app/components/Table";
import { ProductData } from "@/app/types";

interface TableProductProps<T> {
  data: T[];
  columns: { header: string; accessor: keyof T; }[];
  itemsPerPage: number;
}

function TableProduct<T extends ProductData>({ data, columns, itemsPerPage }: TableProductProps<T>): JSX.Element {
  const router = useRouter();

  const onUpdate = (item: T): void => {
    router.push(`/admin/product/${item.ID}/update`);
  };

  const onDelete = async (item: T): Promise<void> => {
    const result = await Swal.fire({
      title: `Delete Product ${item.name ?? "this product"}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/product/${item.ID}`, {
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
  return <Table<T>
    columns={columns}
    data={data}
    itemsPerPage={itemsPerPage}
    onUpdate={onUpdate}
    onDelete={onDelete}
  />
};

export default TableProduct;