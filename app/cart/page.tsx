import React, { JSX } from "react";
import { redirect } from "next/navigation";
import { CartMain } from "@/app/components/cart";
import { getUserFromToken } from "@/app/libs/node/auth";

const CartPage = async (): Promise<JSX.Element> => {
    const user = await getUserFromToken();

    if (!user) redirect("/login");
    return <CartMain user={user} />
};

export default CartPage;