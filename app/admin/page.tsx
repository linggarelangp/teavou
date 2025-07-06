import { JSX } from "react";
import { getUserFromToken } from "@/app/libs/node/auth";
import { redirect } from "next/navigation";

const Dashboard = async (): Promise<JSX.Element> => {
    const admin = await getUserFromToken({ requiredRole: "admin" });

    if (!admin) {
        redirect("/");
    }

    return (
        <div className="w-full">
            <div className='mb-6 p-4 bg-white shadow rounded-lg'>
                <h1 className='text-2xl font-semibold mb-4'>Dashboard</h1>
                <h1 className='text-xl text-gray-500 mb-4'>Hi, {admin!.name}</h1>
            </div>
        </div>
    );
};

export default Dashboard;