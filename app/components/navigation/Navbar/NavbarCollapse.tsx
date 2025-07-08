"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, JSX } from "react";
import { motion } from "framer-motion";

import { UserPayload } from "@/app/types";
import NavAuth from "@/app/components/navigation/Navbar/NavAuth";
import NavbarList from "@/app/components/navigation/Navbar/NavbarList";

const navbarList: { path: string; name: string }[] = [
    { path: "/", name: "Home" },
    { path: "/product", name: "Product" },
    { path: "/about", name: "About" },
];

const NavbarCollapse = ({ token }: { token: UserPayload | null }): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="block lg:hidden">
            <div className="flex justify-between items-center">
                <Link
                    href="/"
                    className="block lg:hidden text-white"
                >
                    <Image
                        src="/img/logo.png"
                        alt="Logo"
                        data-testid="navbar-logo"
                        width={100}
                        height={100}
                        priority
                        className="w-28 h-auto m-0 p-0"
                    />
                </Link>

                <div className="block cursor-pointer">
                    <button
                        onClick={toggleMenu}
                        className="relative w-8 h-8 flex flex-col justify-center items-center group"
                        aria-label="Toggle menu"
                    >
                        {/* Line 1 */}
                        <motion.span
                            variants={{
                                closed: { rotate: 0, y: -8 },
                                open: { rotate: 45, y: 0 },
                            }}
                            animate={isOpen ? "open" : "closed"}
                            transition={{ duration: 0.3 }}
                            className="absolute w-6 h-0.5 bg-white"
                        />

                        {/* Line 2 */}
                        <motion.span
                            variants={{
                                closed: { opacity: 1 },
                                open: { opacity: 0 },
                            }}
                            animate={isOpen ? "open" : "closed"}
                            transition={{ duration: 0.2 }}
                            className="absolute w-6 h-0.5 bg-white"
                        />

                        {/* Line 3 */}
                        <motion.span
                            variants={{
                                closed: { rotate: 0, y: 8, width: 12, x: 6 },
                                open: { rotate: -45, y: 0, width: 24, x: 0 },
                            }}
                            animate={isOpen ? "open" : "closed"}
                            transition={{ duration: 0.3 }}
                            className="absolute h-0.5 bg-white"
                        />
                    </button>
                </div>
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
