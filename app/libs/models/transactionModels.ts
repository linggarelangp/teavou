import { Schema, models, model, Model } from "mongoose";
import { ITransaction, ITransactionItem } from "@/app/types/transaction";

const TransactionItemSchema = new Schema<ITransactionItem>({
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    subtotal: Number,
    imageUrl: String,
});

const TransactionSchema = new Schema<ITransaction>({
    orderId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [TransactionItemSchema],
    amount: Number,
    status: { type: String, default: "pending" },
    snapToken: String,
}, {
    timestamps: true, versionKey: false
});

export const Transaction: Model<ITransaction> = models.Transaction || model<ITransaction>("Transaction", TransactionSchema);