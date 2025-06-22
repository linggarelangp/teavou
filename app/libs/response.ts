import { NextResponse } from "next/server";
import { ResponseData } from "@/app/types";

export const Response = ({
    status,
    message,
    data = undefined,
    ...rest
}: ResponseData): NextResponse => {
    return (data)
        ? NextResponse.json({ status: status, message: message, data: data, ...rest }, { status: status })
        : NextResponse.json({ status: status, message: message, ...rest }, { status: status });
};