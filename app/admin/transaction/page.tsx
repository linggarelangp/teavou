import { JSX } from "react";

import { ITransaction } from "@/app/types";
import { Table } from "@/app/components/Table";
import { getTransactions } from "@/app/services";
import ButtonReport from "@/app/components/Button/ButtonReport";

interface TransactionData {
    orderId: string;
    userId: string;
    totalItems: number;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;

}

const Transaction = async (): Promise<JSX.Element> => {
    const transactionRaw: ITransaction[] = await getTransactions();

    const raw = JSON.parse(JSON.stringify(transactionRaw || []));

    let transactions: TransactionData[] = [];
    let transactionColumns: { header: string; accessor: keyof TransactionData; }[] = [];

    if (raw.length !== 0) {
        transactions = raw.map((t: ITransaction) => ({
            orderId: t.orderId.toString(),
            userId: t.userId,
            totalItems: Number(t.items.length),
            amount: t.amount,
            status: t.status,
            createdAt: t.createdAt ? new Date(t.createdAt) : "",
            updatedAt: t.updatedAt ? new Date(t.updatedAt) : "",
        }))

        transactionColumns = Object.keys(transactions[0]).map((key) => ({
            header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key as keyof typeof transactions[0],
        }));
    }
    return (
        <div className="w-full">
            <div className='mb-6 p-4 bg-zinc-800 shadow rounded-lg'>
                <h1 className='text-2xl font-semibold mb-4'>Transaction</h1>
                <h1 className='text-sm text-gray-500 mb-4'>Show all transaction here...</h1>
            </div>

            <div className="mb-6">

                <ButtonReport />

                {raw.length >= 1 ? (
                    <Table<TransactionData>
                        columns={transactionColumns}
                        data={transactions}
                        itemsPerPage={10}
                    />
                ) : (
                    <div className="text-center text-gray-500">
                        <p>No transactions found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transaction;