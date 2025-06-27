import React from "react";
import Link from "next/link";

import TableClient from "@/app/components/table/TableClient";

import { getProductData } from "@/app/ssg";
import { ProductColumn } from "@/app/libs/utils/columns";

const ProductPage = async () => {
    const products = await getProductData(0);
    return (
        <div className="w-full">
            <div className="mb-6 p-4 bg-white shadow rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Products</h1>
                <p className="text-sm text-gray-500 mb-4">Manage your products here.</p>
            </div>

            <div className="mb-4">
                <Link
                    href={"/admin/product/new"}
                    className="btn btn-md btn-info text-white rounded-4xl drop-shadow-lg"
                >
                    Add Product
                </Link>
            </div>

            <TableClient columns={ProductColumn} data={products} />

        </div>

    );
};

export default ProductPage;