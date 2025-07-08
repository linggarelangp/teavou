"use client";

import Link from "next/link";
import { FaUserLarge } from "react-icons/fa6";
import React, { JSX, useState, useRef, useEffect } from "react";

const dropdownData: { href: string, label: string, isLogout?: boolean }[] = [
    {
        href: "/#",
        label: "Profile",
    },
    {
        href: "/orders",
        label: "My Orders",
    },
    {
        href: "/logout",
        label: "Logout",
        isLogout: true,
    },
];

const UserDropdown = (): JSX.Element => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="text-xl lg:text-2xl text-lime-400 cursor-pointer"
            >
                <FaUserLarge />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-md z-50 p-2">
                    {dropdownData.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            prefetch={false}
                            className={`block px-4 py-2 text-sm hover:bg-lime-600 rounded ${item.isLogout ? 'text-red-500 hover:bg-red-100' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))
                    }
                </div>
            )}
        </div>

    );
};

export default UserDropdown;