import { ITransaction } from "@/app/types/transaction";
import { connection } from "@/app/libs/database/connection";

import { ApiError } from "@/app/libs";
import { Transaction } from "@/app/libs/models/transactionModels";

export const addTransaction = async (transactionData: ITransaction): Promise<ITransaction> => {
    try {
        await connection();

        const transaction = await Transaction.create(transactionData);

        return transaction;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    }
}

export const getTransactions = async (): Promise<ITransaction[]> => {
    try {
        await connection();

        const transactions = await Transaction.find().lean();
        return transactions.map(transaction => transaction);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const getTransactionByUserId = async (userId: string): Promise<ITransaction[]> => {
    try {
        await connection();

        const transactions = await Transaction.find({ userId }).lean();

        return transactions.map(transaction => transaction) || [];
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    }
};

export const updateTransaction = async (_id: string, updateData: ITransaction): Promise<ITransaction> => {
    try {
        await connection();

        const updatedTransaction = await Transaction.findById(_id);
        if (!updatedTransaction) throw new ApiError(404, "Transaction not found");

        updatedTransaction.status = updateData.status || updatedTransaction.status;
        await updatedTransaction.save();

        return updatedTransaction;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);
    };
};

export const updateTransactionStatus = async (orderId: string, midtransStatus: string): Promise<ITransaction> => {
    let status = "pending";

    try {
        await connection();

        const updatedTransaction = await Transaction.findOne({ orderId });

        if (!updatedTransaction) throw new ApiError(404, "Transaction not found");

        switch (midtransStatus) {
            case "settlement":
                status = "success";
                break;
            case "pending":
                status = "pending";
                break;
            default:
                status = "failed";
                break;
        }

        updatedTransaction.status = status;
        await updatedTransaction.save();

        return updatedTransaction;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) throw new ApiError(error.status, message);
        throw new Error(message);

    };

};