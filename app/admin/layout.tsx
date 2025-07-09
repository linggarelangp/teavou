import { Metadata } from "next";
import React, { JSX } from "react";

import { Sidebar } from "@/app/components/navigation";
import { getUserFromToken } from "@/app/libs/node/auth";

type Children = Readonly<{ children: React.ReactNode }>;

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Admin Dashboard Teavou for managing users and products",
};

export default async function AdminLayout({ children }: Children): Promise<JSX.Element> {
    const admin = await getUserFromToken({ requiredRole: "admin" });
    return (
        <div className="flex min-h-screen">
            <aside className="h-screen overflow-hidden">
                <Sidebar data={admin} />
            </aside>
            <main className="flex-1 w-full min-h-screen p-10">
                {children}
            </main>
        </div>
    );
}
