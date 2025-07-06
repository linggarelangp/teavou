"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, JSX } from "react";

import NavbarList from "@/app/components/navigation/Navbar/NavbarList";
import NavAuth from "@/app/components/navigation/Navbar/NavAuth";
import { UserPayload } from "@/app/types";

const navbarList: { path: string; name: string }[] = [
    { path: "/", name: "Home" },
    { path: "/product", name: "Product" },
    { path: "/about", name: "About" },
];

const NavbarCollapse = ({ token }: { token: UserPayload | null }): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="block lg:hidden">
            <div className="flex justify-between items-center">
                <Link
                    href="/"
                    className="block lg:hidden"
                >
                    <Image
                        src="/img/logo.png"
                        alt="Logo"
                        data-testid="navbar-logo"
                        width={100}
                        height={100}
                    />
                </Link>
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="text-gray-700"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {isOpen && (
                <>
                    <div className="mt-4">
                        <ul className="flex flex-col gap-4">
                            {navbarList.map((item, index) => (
                                <NavbarList key={index} path={item.path} name={item.name} />
                            ))}
                        </ul>
                    </div>

                    <NavAuth token={token} />
                </>
            )}

        </div>
    );
};

export default NavbarCollapse;
