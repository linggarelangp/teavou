import { JSX } from "react";
import { getTransactions } from "@/app/services";
import { ITransaction } from "@/app/types/transaction";
import { Table } from "@/app/components/Table";

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
    const transactionRaw = await getTransactions();

    if (!transactionRaw || transactionRaw.length === 0) {
        return (
            <div className="w-full p-4 bg-white shadow rounded-lg">
                <h1 className='text-2xl font-semibold mb-4'>Transaction</h1>
                <h1 className='text-sm text-gray-500 mb-4'>No transactions found.</h1>
            </div>
        )
    }

    const raw = JSON.parse(JSON.stringify(transactionRaw || []));

    const transactions: TransactionData[] = raw.map((t: ITransaction) => ({
        orderId: t.orderId.toString(),
        userId: t.userId,
        totalItems: Number(t.items.length),
        amount: t.amount,
        status: t.status,
        createdAt: t.createdAt ? new Date(t.createdAt) : "",
        updatedAt: t.updatedAt ? new Date(t.updatedAt) : "",
    }))

    const transactionColumns = Object.keys(transactions[0]).map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key as keyof typeof transactions[0],
    }));
    return (
        <div className="w-full">
            <div className='mb-6 p-4 bg-white shadow rounded-lg'>
                <h1 className='text-2xl font-semibold mb-4'>Transaction</h1>
                <h1 className='text-sm text-gray-500 mb-4'>Show all transaction here...</h1>
            </div>

            <div className="mb-6">
                <Table<TransactionData>
                    columns={transactionColumns}
                    data={transactions}
                    itemsPerPage={10}
                />
            </div>
        </div>
    );
};

export default Transaction;