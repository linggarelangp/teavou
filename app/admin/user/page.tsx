import React, { JSX } from "react";

import { IUser } from "@/app/types";
import { getUsers } from "@/app/services";
import { Table } from "@/app/components/Table";

interface User {
    ID: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
}

const User = async (): Promise<JSX.Element> => {
    const usersRaw = await getUsers();

    const raw = JSON.parse(JSON.stringify(usersRaw || []));

    const users: User[] = raw.map((user: IUser) => ({
        ID: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        createdAt: new Date(user.createdAt || ""),
    }));

    const userColumns = Object.keys(users[0]).map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        accessor: key as keyof typeof users[0],
    }));

    const employee = users.filter((user) => user.role === "admin")
    const client = users.filter((user) => user.role === "user");

    return (
        <div className="w-full">
            <div className="mb-6 p-4 bg-white shadow rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Users</h1>
                <p className="text-sm text-gray-500 mb-4">User Management</p>
            </div>

            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-4">Employees</h1>
                <Table<User>
                    columns={userColumns}
                    data={employee}
                    itemsPerPage={5}
                />
            </div>


            <div>
                <h1 className="text-2xl font-semibold mb-4">Customers</h1>
                <Table<User>
                    columns={userColumns}
                    data={client}
                    itemsPerPage={5}
                />
            </div>
        </div>
    );
};

export default User;