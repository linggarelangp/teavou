"use client";

import { JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarList = ({ path, name }: { path: string, name: string }): JSX.Element => {
    const pathname = usePathname();
    return (
        <li
            className={`flex items-center p-1 gap-x-2 hover:text-lime-400 transition-colors duration-300 ease-in-out lg:p-2 text-lg lg:text-base ${path === pathname ? "text-lime-400" : "text-gray-500"}`}
        >
            <Link
                href={path || "#"}
                className="flex items-center"
            >
                {name}
            </Link>
        </li>
    );
};

export default NavbarList;