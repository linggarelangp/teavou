import { downloadTransactionReports } from "@/app/services";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
    try {
        const csv = await downloadTransactionReports();

        const date = new Date();
        const formattedDate = date.toLocaleString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).replace(/[/:]/g, "-").replace(", ", "_");

        const headers = {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename=laporan-${formattedDate}.csv`,
        };

        console.log("CSV generated successfully", csv);

        return new NextResponse(csv, {
            status: 200,
            headers: headers,
        });

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: message }, { status: 500 });

    }
};