import { JSX } from "react";
import Link from "next/link";

import { NavbarListData } from "@/app/types/navbar";

const NavbarList = ({ path, name }: NavbarListData): JSX.Element => {
    return (
        <li
            className="flex items-center p-1 text-sm gap-x-2 hover:text-lime-400 transition-colors duration-300 ease-in-out lg:p-2 lg:text-base"
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