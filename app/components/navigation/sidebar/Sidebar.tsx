"use client";

import Link from "next/link";
import React, { JSX } from "react";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";

import Image from "next/image";
type Menu = {
    name: string;
    link: string;
    icon: React.ElementType;
    margin?: boolean;
}

const menus: Menu[] = [
    { name: "dashboard", link: "/admin", icon: MdOutlineDashboard },
    { name: "user", link: "/admin/user", icon: AiOutlineUser },
    { name: "product", link: "/admin/product", icon: FiMessageSquare },
    { name: "analytics", link: "#", icon: TbReportAnalytics, margin: true },
    { name: "Transaction", link: "/admin/transaction", icon: GrTransaction },
    { name: "Setting", link: "#", icon: RiSettings4Line, margin: true },
]

const Sidebar = ({ data }: { data: { name: string, email: string, } }): JSX.Element => {
    const pathname = usePathname();

    return (
        <div className={`min-h-screen w-64 shadow-lg duration-300 px-4`}>
            <div className="pt-8 pb-3 flex flex-col items-center">
                <Image
                    src="/img/cat-avatar.jpg"
                    alt="avatar"
                    width={70}
                    height={70}
                    priority={true}
                    className="w-20 h-20 mb-3 rounded-full object-cover"
                />
                <h1 className="text-lg font-semibold tracking-wide">Hi, {data.name}</h1>
                <p className="text-sm font-thin">{data.email}</p>
            </div>
            <hr className="mb-5" />

            <div className="mt-4 flex flex-col gap-4 relative">
                {menus.map((menu, i) => (
                    <Link
                        key={i}
                        href={menu.link}
                        className={`hover:bg-lime-400 ${menu.margin && "mt-7"} group flex items-center text-sm  gap-3.5 font-medium p-2 rounded-md ${pathname === menu.link && "bg-lime-400"}`}
                    >
                        <div>
                            {React.createElement(menu?.icon, { size: "20" })}
                        </div>

                        <h2
                            style={{ transitionDelay: ((i + 3) * 100 + "ms").toString() }}
                            className="whitespace-pre overflow-hidden"
                        >
                            {menu.name}
                        </h2>
                        <h2
                            className="hidden absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit"
                        >
                            {menu.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;