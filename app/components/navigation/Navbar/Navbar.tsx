"use client";

import { JSX } from "react";
import Link from "next/link";
import Image from "next/image";

import { UserPayload } from "@/app/types";
import { NavAuth, NavbarList, NavbarCollapse } from "@/app/components/navigation";

const navbarList: { path: string; name: string; }[] = [
    {
        path: "#home",
        name: "Home",
    },
    {
        path: "#about",
        name: "About",
    },
    {
        path: "#menu",
        name: "Menu",
    },
    {
        path: "#contact",
        name: "Contact",
    },

];


type NavbarProps = {
    token: UserPayload | null;
};

const Navbar = ({ token }: NavbarProps): JSX.Element => {

    return (
        <nav className="w-full fixed top-0 left-0 bg-black/80 backdrop-blur-md border-b border-gray-700 px-4 lg-px-0 py-4 z-10 rounded-lg lg:rounded-none">

            <div className="max-w-4/5 mx-auto flex flex-wrap items-center justify-between">
                <Link
                    href="/"
                    className="hidden lg:block text-2xl"
                >
                    <Image
                        src="/img/logo.png"
                        alt="Logo"
                        data-testid="navbar-logo"
                        width={100}
                        height={100}
                        priority
                        className="w-24 h-auto m-0 p-0"
                    />
                </Link>

                <div className="hidden lg:block">
                    <ul
                        daa-testid="navbar-list"
                        className="flex flex-col mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center gap-4"
                    >
                        {navbarList.map((item, index: number) => (
                            <NavbarList
                                key={index}
                                path={item.path}
                                name={item.name}
                            />
                        ))}
                    </ul>
                </div>

                <div className="hidden lg:flex lg:items-center lg:space-x-5 cursor-pointer">
                    <NavAuth token={token} />
                </div>
            </div>

            <NavbarCollapse token={token} />

        </nav>
    );
};

export default Navbar;
