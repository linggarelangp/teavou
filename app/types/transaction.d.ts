import { Types } from "mongoose";

export interface ITransactionItem {
    _id?: Types.ObjectId | string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    imageUrl: string;
};

export interface ITransaction {
    _id?: Types.ObjectId | string;
    orderId: string;
    userId: Types.ObjectId | string;
    items: ITransactionItem[];
    amount: number;
    status: string;
    snapToken?: string;
    updatedAt?: string | number | Date;
    createdAt?: string | number | Date;
};

export interface TransactionData {
    _id?: Types.ObjectId | string;
    orderId: string;
    userId: Types.ObjectId | string;
    items: ITransactionItem[];
    amount: number;
    status: string;
};