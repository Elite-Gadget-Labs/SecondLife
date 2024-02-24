import { ColumnDef } from "@tanstack/react-table";
import { AccountData } from "./types";

// Define the columns for the UserProfilesTable
export const userProfilesColumns: ColumnDef<AccountData>[] = [
  {
    accessorKey: "id", // Accessor matches the key in your data
    header: "ID",
    cell: (info) => info.getValue(), // Simple render
  },
  {
    accessorKey: "clerkId",
    header: "Clerk ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (info) => info.getValue(),
  },
  // You can add more columns as needed based on your data
];

export default userProfilesColumns;
