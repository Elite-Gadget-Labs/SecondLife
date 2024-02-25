import React from "react";
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table";
import { AccountData } from "./types";

// Define the DataTableProps with a generic type
interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

const actionColumns: ColumnDef<AccountData>[] = [
  {
    id: "makeAdmin",
    header: "Make Admin",
    cell: ({ row }: { row: Row<AccountData> }) => (
      <button
        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        onClick={() => console.log("Make Admin", row.original)}
      >
        Make Admin
      </button>
    ),
  },
  {
    id: "delete",
    header: "Delete",
    cell: ({ row }: { row: Row<AccountData> }) => (
      <button
        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
        onClick={() => console.log("Delete", row.original)}
      >
        Delete
      </button>
    ),
  },
];

// UserProfilesTable component
export const UserProfilesTable: React.FC<DataTableProps<AccountData>> = ({
  columns,
  data,
}) => {
  // Combine the existing columns with the action columns
  const combinedColumns = React.useMemo(
    () => [...columns, ...actionColumns],
    [columns]
  );

  const table = useReactTable({
    data,
    columns: combinedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserProfilesTable;
