import { JSX } from "react";
import { notFound } from "next/navigation";

import { getProductById } from "@/app/ssg";
import UpdateProduct from "@/app/components/admin/UpdateProduct";

type Params = Promise<{ id: string }>

export default async function UpdateProductPage(
    props: { params: Params }
): Promise<JSX.Element> {
    const params = await props.params;
    const id = params.id;
    const product = await getProductById(id, 0);

    if (!product) return notFound();

    return (
        <div className='w-full'>
            <div className='mb-6 p-4 bg-white shadow rounded-lg'>
                <h1 className='text-2xl font-semibold mb-4'>Update Product</h1>
            </div>

            <UpdateProduct data={product} />
        </div>
    );
}
