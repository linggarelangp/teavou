import { ApiError } from "@/app/libs";
import { NextRequest, NextResponse } from "next/server";
import { updateTransactionStatus } from "@/app/services/transactionServices";

/**
 * This route handles the Midtrans webhook for updating transaction status.
 * It expects a JSON payload with `order_id` and `transaction_status`.
 * 
 * @param req - The incoming request containing the webhook data.
 * @returns A JSON response indicating success or failure.
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    try {
        const body = await request.json();
        const { order_id, transaction_status } = body;

        if (!order_id || !transaction_status) {
            return NextResponse.json({ success: false, status: 400, error: "Invalid payload" }, { status: 400 });
        }

        await updateTransactionStatus(order_id, transaction_status);

        return NextResponse.json({ success: true, status: 200, message: "Transaction status updated successfully" }, { status: 200 });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";

        if (error instanceof ApiError) return NextResponse.json({ success: false, status: error.status, error: message }, { status: error.status });
        return NextResponse.json({ success: false, status: 500, error: message }, { status: 500 });
    };
};
