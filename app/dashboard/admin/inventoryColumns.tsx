"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "clerkId",
    header: "User ID",
  },
  {
    accessorKey: "cellType",
    header: "Battery Type",
  },
  {
    accessorKey: "manufacturer",
    header: "Manufacturer",
  },
  {
    accessorKey: "eolTimeMonths",
    header: "Time to EOL(months)",
    cell: (context) => {
      const data = context.row.original;
      return <div>{data.eolTimeMonths} Months</div>;
    },
  },
  {
    accessorKey: "soh",
    header: "State of Health",
    cell: (context) => {
      const data = context.row.original;
      let bgColor;

      if (data.soh >= 96 && data.soh <= 100) {
        bgColor = "bg-green-500"; // Dark green
      } else if (data.soh >= 91 && data.soh <= 95) {
        bgColor = "bg-green-400"; // Light green
      } else if (data.soh >= 86 && data.soh <= 90) {
        bgColor = "bg-yellow-300"; // Yellow
      } else if (data.soh >= 80 && data.soh <= 85) {
        bgColor = "bg-orange-300"; // Orange
      } else if (data.soh < 80) {
        bgColor = "bg-red-400"; // Red
      }

      return (
        <div className={`${bgColor} font-bold p-2 rounded`}>{data.soh}%</div>
      );
    },
  },
  {
    accessorKey: "status",
    // header: "Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
