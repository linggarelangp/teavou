import { JSX } from "react";
import NavbarList from "@/app/components/Navbar/NavbarList";
import { NavbarListData } from "@/app/types/navbar";
import NavAuth from "@/app/components/Navbar/NavAuth";
import Image from "next/image";
import Link from "next/link";

const navbarList: NavbarListData[] = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/products",
        name: "Products",
    },
    {
        path: "/about",
        name: "About",
    },

]

const Navbar = (): JSX.Element => {
    return (
        <nav className="block w-full px-4 py-3 mx-auto shadow-md rounded-md lg:px-8">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <Link
                    href="/"
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
                        {navbarList.map((item: NavbarListData, index: number) => (
                            <NavbarList
                                key={index}
                                path={item.path}
                                name={item.name}
                            />
                        ))}
                    </ul>
                </div>

                <div className="flex items-center space-x-5 cursor-pointer">
                    <NavAuth />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
