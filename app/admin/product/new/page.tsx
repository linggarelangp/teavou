import React from "react";

import { AddProductForm } from "@/app/components/admin/Form";

const AddProductPage = () => {
    return (
        <div className="w-full">
            <div className="mb-6 p-4 bg-white shadow rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Add Product</h1>
            </div>

            <AddProductForm />
        </div>
    )
};

export default AddProductPage;