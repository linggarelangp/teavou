import React, { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

type ImageUploaderProps = {
    initialPreview?: string | null;
    onFileSelect: (file: File | null) => void;
};

const ImageUploader = ({ initialPreview = null, onFileSelect }: ImageUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(initialPreview);

    const validateFile = (file: File) => {
        const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        const maxSize = 5 * 1024 * 1024;

        if (!validTypes.includes(file.type)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Only JPG, PNG, GIF, and WEBP files are allowed.",
            });
            return false;
        }
        if (file.size > maxSize) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "File size must be less than 5MB.",
            });
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

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && validateFile(file)) {
            preview(file);
            onFileSelect(file);
        }
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && validateFile(file)) {
            preview(file);
            onFileSelect(file);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <div
                onClick={() => inputRef.current?.click()}
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-indigo-500 transition bg-white"
            >
                {!previewUrl ? (
                    <div className="space-y-1 text-center">
                        <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 justify-center">
                            <span className="font-medium text-indigo-600 hover:underline">Upload a file</span>
                            &nbsp;or drag and drop
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                ) : (
                    <div className="relative w-72 h-72">
                        <Image src={previewUrl} alt="Preview" fill className="w-full h-screen object-cover rounded" />
                    </div>
                )}

                <input
                    type="file"
                    ref={inputRef}
                    onChange={onFileChange}
                    accept="image/*"
                    className="sr-only"
                />
            </div>
        </div>
    );
};

export default ImageUploader;
