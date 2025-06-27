"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";

import Input from "@/app/components/input/Input";
import Textarea from "@/app/components/input/Textarea";
import ImageUploader from "@/app/components/admin/ImageUploader";
import Swal from "sweetalert2";

type FormValues = {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
};
const AddProduct = (): JSX.Element => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: undefined,
    });

    const onSubmit = async (formData: FormValues) => {

        if (!file || !(file instanceof File)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please upload a product image.",
            });
            return;
        }

        const body = new FormData();
        body.append("name", formData.name);
        body.append("description", formData.description || "");
        body.append("price", String(formData.price));
        body.append("stock", String(formData.stock));
        body.append("file", file);

        console.log("Form Data:", formData);

        try {
            const response = await fetch(`/api/product/`, {
                method: "POST",
                body,
            });

            if (!response.ok) throw new Error("Failed to update product");

            Swal.fire({
                icon: "success",
                title: "Data Created successfully",
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

            <Input
                label="Product Stock"
                type="number"
                {...register("stock", {
                    required: "Product stock cannot be empty",
                    valueAsNumber: true,
                    min: { value: 1, message: "Product stock must greater than 0" },
                })}
                error={errors.stock?.message}
            />

            <ImageUploader onFileSelect={setFile} />

            <div className="flex space-x-4 py-5">
                <button
                    className="btn btn-info flex-1"
                    type="submit"
                >
                    Add
                </button>

                <button
                    className="btn btn-error flex-1"
                    type="button" onClick={() => router.push("/admin/product")}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default AddProduct