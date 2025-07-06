import Link from "next/link";
import React, { JSX } from "react";

import { IProduct, ProductData } from "@/app/types/product";
import { getProducts } from "@/app/services/productServices";

import TableProduct from "@/app/components/admin/Table/TableProduct";

const Product = async (): Promise<JSX.Element> => {
    const productRaw = await getProducts();

    const raw = JSON.parse(JSON.stringify(productRaw || []));

    let products: ProductData[] = [];
    let productColumns: { header: string; accessor: keyof ProductData }[] = [];

    if (raw.length >= 0) {
        products = raw.map((product: IProduct) => ({
            ID: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.imageUrl,
            createdAt: new Date(product.createdAt || ""),
            updatedAt: new Date(product.updatedAt || ""),
        }));

        productColumns = Object.keys(products[0]).map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key as keyof typeof products[0],
        }));
    }


    return (
        <div className="w-full">
            <div className="mb-6 p-4 bg-white shadow rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Product</h1>
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

            <div className="mb-6">
                {raw.length >= 0 ? (
                    <TableProduct<ProductData>
                        columns={productColumns}
                        data={products}
                        itemsPerPage={5}
                    />
                ) : (
                    <div className="text-center text-gray-500">
                        <p>No products found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;