import React from "react";

import AddProduct from "@/app/components/admin/Form/AddProductForm";

const AddProductPage = () => {
    return (
        <div className="w-full">
            <div className="mb-6 p-4 bg-white shadow rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Add Product</h1>
            </div>

            <AddProduct />
        </div>
    )
};

export default AddProductPage;