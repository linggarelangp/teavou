"use client";

import Link from "next/link";
import React, { JSX } from "react";

import { UserPayload } from "@/app/types";
import { CartIcon } from "@/app/components/Icon";
import UserDropdown from "@/app/components/Dropdown/UserDropdown";
import { FaArrowRight } from "react-icons/fa6";

const NavAuth = ({ token }: { token: UserPayload | null }): JSX.Element => {

    return !token ? (
        <div className="mt-3 lg:mt-0 flex items-center justify-center gap-3">
            <Link
                href={"/login"}
                prefetch={false}
                className="btn lg:btn-sm bg-lime-600 hover:bg-lime-700 rounded-box border-none shadow-none px-5 w-1/2 lg:w-auto"
            >
                Login
            </Link>

            <Link
                href={"/register"}
                prefetch={false}
                className="btn lg:btn-sm bg-transparent rounded-box border shadow-none px-5 w-1/2 lg:w-auto border-lime-600 text-lime-600 hover:text-white hover:bg-lime-600 py-2 transition-colors duration-300 ease-in-out"
            >
                Register
            </Link>
        </div>
    ) : (
        <div className="flex items-center mt-5 lg:mt-0 justify-center lg:justify-around space-x-5 px-0 lg:px-7">
            {!token.role.includes("admin") ? (
                <>
                    <CartIcon />
                    <UserDropdown />
                </>
            ) : (
                <Link href={"/admin"} className="btn btn-sm border-none shadow-none bg-lime-600 flex items-center">
                    Ke Admin
                    <span><FaArrowRight /></span>
                </Link>
            )}
        </div>
    )
}

export default NavAuth;