"use client";

import { ColumnDef } from "@tanstack/react-table";

//@ts-ignore
export const columns2: ColumnDef[] = [
    {
        accessorKey: "id",
        header: "Order ID",
    },
    {
        accessorKey: "orderDate",
        header: "Date",
    },
    {
        accessorKey: "orderStatus",
        header: "Status",
    },
    {
        accessorKey: "batteryType",
        header: "Battery Type",
    },
    {
        accessorKey: "orderAmount",
        header: "Cell Amount",
    },
    {
        accessorKey: "waitTimeMonths",
        header: "Wait Time (Months)",
    },
];
