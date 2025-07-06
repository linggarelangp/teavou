import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

import { ApiError } from "@/app/libs";
import { addTransaction } from "@/app/services/transactionServices";
import { ITransaction, ITransactionItem } from "@/app/types/transaction";

export const POST = async (request: Request): Promise<NextResponse> => {
    try {
        const { userId, name, email, items } = await request.json();

        if (!userId || !name || !email || !items || items.length === 0) {
            return NextResponse.json({ success: false, status: 400, error: "Invalid input data" }, { status: 400 });
        };

        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.NEXT_MIDTRANS_SERVER_KEY,
        });

        const orderId = `TEAVID-${Date.now()}`;
        const totalAmount = items.reduce((sum: number, item: ITransactionItem) => sum + item.price * item.quantity, 0);

        const midtransSnapParams = {
            transaction_details: {
                order_id: orderId,
                gross_amount: totalAmount,
            },
            customer_details: {
                first_name: name,
                email: email,
            },
            item_details: items.map((item: ITransactionItem) => ({
                id: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
        };

        const midtransRes = await snap.createTransaction(midtransSnapParams);

        const transactionData: ITransaction = {
            orderId,
            userId,
            items: items.map((item: ITransactionItem) => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                subtotal: item.price * item.quantity
            })),
            amount: totalAmount,
            status: "pending",
            snapToken: midtransRes.token,
        };

        await addTransaction(transactionData);

        return NextResponse.json(({ success: true, status: 201, token: midtransRes.token }), { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};