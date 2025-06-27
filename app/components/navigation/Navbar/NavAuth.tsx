import { JSX } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { FaCartShopping, FaUserLarge } from "react-icons/fa6";

const NavAuth = async (): Promise<JSX.Element> => {
    const cookieStore = await cookies();
    const token: string | undefined = cookieStore.get("token")?.value;


    return !token ? (
        <div>
            <Link
                href={"/login"}
                className="text-xl lg:text-sm hover:text-lime-500 transition-colors duration-150 ease-in-out"
            >
                Login
            </Link>
            <span className="mx-2 text-xl lg:text-sm text-lime-500">|</span>
            <Link
                href={"/register"}
                className="text-xl lg:text-sm hover:text-lime-500 transition-colors duration-150 ease-in-out"
            >
                Register
            </Link>
        </div>
    ) : (
        <>
            <FaCartShopping className="text-2xl lg:text-xl text-lime-400" />
            <FaUserLarge className="text-2xl lg:text-xl text-lime-400" />
        </>
    )
}

export default NavAuth;