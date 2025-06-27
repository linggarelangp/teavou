import TableClient from '@/app/components/table/TableClient'
import { UserColumn } from '@/app/libs/utils/columns'
import { getUsersData } from '@/app/ssg'
import React from 'react'

const UserPage = async () => {
    const users = await getUsersData(0)
    const client = users.filter((user) => user.role === "user")
    const employee = users.filter((user) => user.role === "admin")
    return (
        <React.Fragment>
            <div className="w-full">
                <div className="mb-6 p-4 bg-white shadow rounded-lg">
                    <h1 className="text-2xl font-semibold mb-4">Users</h1>
                    <p className="text-sm text-gray-500 mb-4">User Management</p>
                </div>

                <div className="mb-6">
                    <h1 className="text-2xl font-semibold mb-4">Employees</h1>
                    <TableClient columns={UserColumn} data={employee} />
                </div>

                <div>
                    <h1 className="text-2xl font-semibold mb-4">Client</h1>
                    <TableClient columns={UserColumn} data={client} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserPage