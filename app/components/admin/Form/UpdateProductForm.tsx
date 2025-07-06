"use client";

import Swal from "sweetalert2";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { IProduct } from "@/app/types/product";
import { Input, Textarea, CustomImageUpload } from "@/app/components/Input"

type FormValues = {
    _id: string;
    name: string;
    description?: string;
    price: number;
};

const UpdateProductForm = ({ data }: { data: IProduct }): JSX.Element => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: data,
    });

    const onSubmit = async (formData: FormValues) => {
        const body = new FormData();
        body.append("name", formData.name);
        body.append("description", formData.description || "");
        body.append("price", String(formData.price));
        if (file) body.append("file", file);

        try {
            const res = await fetch(`/api/product/${formData._id}`, {
                method: "PUT",
                body,
            });

            const response: { success: boolean, status: number, data?: IProduct } = await res.json()

            if (!response.success) throw new Error("Failed to update product");

            Swal.fire({
                icon: "success",
                title: "Data updated successfully",
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
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-5 mt-10">
            <Input
                label="Product ID"
                type="text"
                {...register("_id")}
                disabled
            />

            <Input
                label="Product Name"
                type="text"
                {...register("name", { required: "Product name cannot be empty" })}
                error={errors.name?.message}
            />

            <Textarea
                label="Product Description"
                {...register("description")}
                error={errors.description?.message}
            />

            <Input
                label="Product Price"
                type="number"
                {...register("price", {
                    required: "Product price cannot be empty",
                    valueAsNumber: true,
                    min: { value: 1, message: "Product price must greater than 0" },
                })}
                error={errors.price?.message}
            />

            <CustomImageUpload onFileSelect={setFile} />

            <div className="flex space-x-4 py-5">
                <button
                    className="btn btn-info flex-1"
                    type="submit"
                >
                    Update
                </button>

                <button
                    className="btn btn-error flex-1"
                    type="button" onClick={() => router.push("/admin/product")}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default UpdateProductForm;
