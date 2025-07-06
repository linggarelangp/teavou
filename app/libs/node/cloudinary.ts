import { type UploadApiResponse, v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.NEXT_API_CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.NEXT_API_CLOUDINARY_KEY!,
    api_secret: process.env.NEXT_API_CLOUDINARY_SECRET_KEY!,
});

export const uploads = async (file: File): Promise<UploadApiResponse> => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "products" }, (err, result) => {
                if (err || !result) return reject(err);
                resolve(result);
            }).end(buffer);
        });

        if (!uploadResult || !uploadResult.secure_url || !uploadResult.public_id) {
            throw new Error("Failed to upload image");
        };

        return uploadResult;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred during upload";
        throw new Error(message);
    };
};

export const destroy = async (imagePublicId: string): Promise<void> => {
    try {
        await cloudinary.uploader.destroy(imagePublicId).then(result => result);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred during deletion";
        throw new Error(message);
    };
};