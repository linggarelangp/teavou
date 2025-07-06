"use client";

import React, { JSX } from "react";
import Link from "next/link";

import CartIcon from "@/app/components/Icon/CartIcon";
import UserDropdown from "@/app/components/Dropdown/UserDropdown";
import { UserPayload } from "@/app/types";

const NavAuth = ({ token }: { token: UserPayload | null }): JSX.Element => {

    return !token ? (
        <div className="mt-3 lg:mt-0">
            <Link
                href={"/login"}
                prefetch={false}
                className="text-lg lg:text-sm text-gray-500 hover:text-lime-500 transition-colors duration-150 ease-in-out"
            >
                Login
            </Link>
            <span className="mx-2 text-xl lg:text-sm text-lime-500">|</span>
            <Link
                href={"/register"}
                prefetch={false}
                className="text-lg lg:text-sm text-gray-500 hover:text-lime-500 transition-colors duration-150 ease-in-out"
            >
                Register
            </Link>
        </div>
    ) : (
        <div className="flex items-center mt-5 lg:mt-0 justify-center lg:justify-around space-x-5 px-0 lg:px-7">
            <CartIcon />
            <UserDropdown />
        </div>
    )
}

export default NavAuth;