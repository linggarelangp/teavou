import React, { JSX } from "react";
import Sidebar from "@/app/components/admin/Sidebar";
import { cookieStore } from "@/app/libs/cookies.store";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Admin Dashboard Teavou",
};

export default async function Layout({
    children
}: {
    children: React.ReactNode
}): Promise<JSX.Element> {
    const data = await cookieStore();
    return (
        <div className="flex h-screen">
            <aside className="h-screen overflow-hidden">
                <Sidebar data={data} />
            </aside>
            <main className="flex-1 w-full h-screen p-10">
                {children}
            </main>
        </div>
    );
}
