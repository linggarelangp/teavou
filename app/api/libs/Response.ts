import { NextResponse } from "next/server";
import { ResponseData } from "@/app/api/types";

const Response = ({
    status,
    message,
    data = undefined
}: ResponseData): NextResponse => {
    return (data)
        ? NextResponse.json({ status: status, message: message, data: data, }, { status: status })
        : NextResponse.json({ status: status, message: message, }, { status: status });
};

export default Response;