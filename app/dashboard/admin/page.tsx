import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatteryInventory } from "@/components/battery-inventory";
import { BatteryOrders } from "@/components/battery-orders";
import { DataTable } from "@/app/dashboard/admin/data-table";
import { columns } from "@/app/dashboard/admin/inventoryColumns";

const data = [
    {
        uuid: "123456789",
        clerkId: "001",
        cellType: "Lithium-ion",
        manufacturer: "Tesla",
        eolTime: "2025",
        soh: 97,
        status: "First Life",
    },
    {
        uuid: "987654321",
        clerkId: "002",
        cellType: "Nickel-Metal Hydride",
        manufacturer: "Toyota",
        eolTime: "2023",
        soh: 40,
        status: "Purchased",
    },
    {
        uuid: "456789123",
        clerkId: "003",
        cellType: "Lithium-ion",
        manufacturer: "Nissan",
        eolTime: "2024",
        soh: 92,
        status: "Second Life",
    },
    {
        uuid: "789123456",
        clerkId: "004",
        cellType: "Nickel-Metal Hydride",
        manufacturer: "General Motors",
        eolTime: "2026",
        soh: 89,
        status: "Recycled",
    },
    {
        uuid: "321654987",
        clerkId: "005",
        cellType: "Lithium-ion",
        manufacturer: "BMW",
        eolTime: "2027",
        soh: 82,
        status: "Requested",
    },
];

const AdminPage = () => {
    return (
        <>
            <h1 className="text-2xl font-semibold pb-8">EV Battery Dashboard</h1>

            <Tabs defaultValue="battery-market">
                <TabsList>
                    <TabsTrigger value="battery-market">Battery Market</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    <BatteryOrders />
                </TabsContent>
                <TabsContent value="battery-market">
                    <DataTable columns={columns} data={data} />
                </TabsContent>
            </Tabs>
        </>
    );
};

export default AdminPage;
