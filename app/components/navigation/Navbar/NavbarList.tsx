"use client";

import { JSX } from "react";
import Link from "next/link";

/**
 * NavbarList component renders a list item with a link.
 * It highlights the link based on the current path.
 *
 * @param {Object} props - The component props.
 * @param {string} props.path - The path for the link.
 * @param {string} props.name - The name to display in the link.
 * @returns {JSX.Element} The rendered list item with a link.
 */


const NavbarList = ({ path, name }: { path: string, name: string }): JSX.Element => {

    return (
        <li
            className={`font-semibold flex items-center hover:text-lime-600 text-gray-300`}
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