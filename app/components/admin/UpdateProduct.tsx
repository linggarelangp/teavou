"use client";

import { Product } from "@/app/types";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { JSX, useRef, useState } from "react";

const UpdateProduct = ({ data }: { data: Product }): JSX.Element => {
    const router = useRouter();
    const [product, setProduct] = useState<Product>(data);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && validateFile(droppedFile)) {
            preview(droppedFile);
            setFile(droppedFile);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile && validateFile(selectedFile)) {
            preview(selectedFile);
            setFile(selectedFile);
        }
    };

    const validateFile = (file: File) => {
        const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        const maxSize = 5 * 1024 * 1024;

        if (!validTypes.includes(file.type)) {
            alert("Hanya file gambar yang diperbolehkan.");
            return false;
        }

        if (file.size > maxSize) {
            alert("Ukuran file terlalu besar. Maksimal 5MB.");
            return false;
        }

        return true;
    };

    const preview = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description || "");
        formData.append("price", String(product.price));
        formData.append("stock", String(product.stock));

        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await fetch(`/api/product/${product._id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to update product");

            alert("Produk berhasil diperbarui!");
            router.push("/admin/product");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Terjadi kesalahan";
            alert(message);
        }

    };
    return (
        <div className="w-full h-screen space-y-5 mt-10">
            <form
                action="POST"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                    <div className="sm:col-span-1">
                        <label className="block text-sm/6 font-medium text-gray-900">Product ID</label>
                        <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <input
                                    type={"text"}
                                    name={"_id"}
                                    value={product._id}
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Product ID"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>


                    <div className="sm:col-span-1">
                        <label className="block text-sm/6 font-medium text-gray-900">Product Name</label>
                        <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <input
                                    type={"text"}
                                    name={"name"}
                                    value={product.name || ""}
                                    onChange={e =>
                                        setProduct({ ...product, name: e.target.value })
                                    }
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-100 focus:outline-none sm:text-sm/6" placeholder="Product Name"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sm:col-span-1">
                    <label className="block text-sm/6 font-medium text-gray-900">Product Description</label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <textarea
                                rows={4}
                                name={"description"}
                                value={product.description || ""}
                                onChange={e =>
                                    setProduct({ ...product, description: e.target.value })
                                }
                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-100 focus:outline-none sm:text-sm/6" placeholder="Describe the product here..."
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                    <div className="sm:col-span-1">
                        <label className="block text-sm/6 font-medium text-gray-900">Product Price</label>
                        <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <input
                                    type={"number"}
                                    name={"_id"}
                                    value={product.price || ""}
                                    onChange={e =>
                                        setProduct({ ...product, price: Number(e.target.value) })
                                    }
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label className="block text-sm/6 font-medium text-gray-900">Product Name</label>
                        <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                <input
                                    type={"number"}
                                    name={"stock"}
                                    value={product.stock || ""}
                                    onChange={e =>
                                        setProduct({ ...product, stock: Number(e.target.value) })
                                    }
                                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-100 focus:outline-none sm:text-sm/6" placeholder="Product Stock"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image
                    </label>
                    <div
                        onClick={() => inputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-indigo-500 transition bg-white"
                    >
                        {!previewUrl ? (
                            <div className="space-y-1 text-center">
                                <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600 justify-center">
                                    <span className="font-medium text-indigo-600 hover:underline">
                                        Upload a file
                                    </span>
                                    &nbsp;or drag and drop
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        ) : (
                            <div className="relative w-72 h-72">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="w-full h-screen object-cover rounded"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={handleChange}
                            accept="image/*"
                            className="sr-only"
                        />
                    </div>
                </div>

                <div className="w-full space-x-4 flex space-y-10 mt-5">
                    <button className="w-1/2 btn btn-info" type="submit">Update</button>
                    <button
                        className="w-1/2 btn btn-error">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProduct;