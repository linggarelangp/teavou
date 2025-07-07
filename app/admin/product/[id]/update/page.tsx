import { JSX } from "react";
import { notFound } from "next/navigation";

import { getProductById } from "@/app/services"
import { UpdateProductForm } from "@/app/components/admin/Form";

type Params = Promise<{ id: string }>

const UpdateProductPage = async (props: { params: Params }): Promise<JSX.Element> => {
    const params = await props.params;
    const id = params.id;

    if (!id) return notFound();

    const raw = await getProductById(id);
    const product = JSON.parse(JSON.stringify(raw || null))

    if (!product) return notFound();
    return (
        <div className='w-full'>
            <div className='mb-6 p-4 bg-white shadow rounded-lg'>
                <h1 className='text-2xl font-semibold mb-4'>Update Product</h1>
            </div>

            <UpdateProductForm data={product} />
        </div>
    );
};

export default UpdateProductPage;