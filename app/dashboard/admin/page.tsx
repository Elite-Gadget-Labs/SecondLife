"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatteryOrders } from "@/components/battery-orders";
import { DataTable } from "@/app/dashboard/admin/data-table";
import { columns } from "@/app/dashboard/admin/inventoryColumns";
import { useEffect, useState } from "react";

const AdminPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/all-batteries");
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Error fetching battery data:", error);
            }
        };

        fetchData();
    }, []);

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
