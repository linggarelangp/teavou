import { JSX } from "react";
import Link from "next/link";
import Image from "next/image";

import { getUserFromToken } from "@/app/libs/node/auth";
import { NavAuth, NavbarList, NavbarCollapse } from "@/app/components/navigation";

const navbarList: { path: string; name: string; }[] = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/product",
        name: "Product",
    },
    {
        path: "/about",
        name: "About",
    },
];

const Navbar = async (): Promise<JSX.Element> => {
    const token = await getUserFromToken();

    return (
        <nav className="block w-full px-4 py-3 mx-auto shadow-md rounded-md lg:px-8">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link
                    href="/"
                    className="hidden lg:block"
                >
                    <Image
                        src="/img/logo.png"
                        alt="Logo"
                        data-testid="navbar-logo"
                        width={100}
                        height={100}
                    />
                </Link>

                <div className="hidden lg:block">
                    <ul
                        daa-testid="navbar-list"
                        className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"
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
