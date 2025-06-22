import { NextResponse } from "next/server";
import { ResponseData } from "@/app/api/types";


const Response = ({
    status,
    message,
    data = undefined,
    ...rest
}: ResponseData): NextResponse => {
    return (data)
        ? NextResponse.json({ status: status, message: message, data: data, ...rest }, { status: status })
        : NextResponse.json({ status: status, message: message, ...rest }, { status: status });
};

export default Response;