"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/dashboard/admin/data-table";
import { DataTable2 } from "@/app/dashboard/admin/data-table2";
import { columns } from "@/app/dashboard/admin/inventoryColumns";
import { columns2 } from "@/app/dashboard/admin/orderColumns";
import { useEffect, useState } from "react";
import { Microgrids } from "@/components/microgrids";

const AdminPage = () => {
    const [data, setData] = useState([]);
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch("/api/orders")
            .then((res) => res.json())
            .then((data) => {
                setRecords(data);
            })
            .catch((err) => console.log(err));
    }, []);

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
                    <TabsTrigger value="microgrids">Microgrids</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    <DataTable2 columns={columns2} data={records} />
                </TabsContent>
                <TabsContent value="battery-market">
                    <DataTable columns={columns} data={data} />
                </TabsContent>
                <TabsContent value="microgrids">
                    <Microgrids />
                </TabsContent>
            </Tabs>
        </>
    );
};

export default AdminPage;
