import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function BatteryOrders() {
  return (
    <main className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Battery Type</TableHead>
            <TableHead>Desired SOH Range</TableHead>
            <TableHead>Cell Quantity</TableHead>
            <TableHead>Wait Time (Months)</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>12345</TableCell>
            <TableCell>01/01/2024</TableCell>
            <TableCell>
              <Badge className="bg-yellow-500 text-white">PENDING</Badge>
            </TableCell>
            <TableCell>Li-ion</TableCell>
            <TableCell>70% - 80%</TableCell>
            <TableCell>1000</TableCell>
            <TableCell>6</TableCell>
            <TableCell>
              <Button className="mr-2" variant="outline">
                Update
              </Button>
              <Button className="bg-red-500 text-white" variant="outline">
                Cancel
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button className="mt-4">Create Order</Button>
    </main>
  );
}
