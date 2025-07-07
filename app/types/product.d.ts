export interface IProduct {
    _id?: string;
    name: string;
    description?: string;
    price: number;
    imageUrl: string;
    imagePublicId: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export interface ProductPayload {
    name: string;
    description?: string;
    price: number;
}

export interface CreateProductPayload extends ProductPayload { file: File; }

export interface UpdateProductPayload extends ProductPayload { file?: File | null; }

export interface ProductData {
    ID: string;
    name: string;
    description?: string;
    price: number;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
};
