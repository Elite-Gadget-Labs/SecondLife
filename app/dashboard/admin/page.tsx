"use client";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn-ui/tabs";

import UserProfilesTab from "../../../components/admin-ui/profiles/UserProfilesTab";
import { DataTable } from "@/components/data-table";
import { columns } from "../../../components/admin-ui/inventory/inventoryColumns";
import { Microgrids } from "../../../components/admin-ui/microgrid/microgrids";
import { columns2 } from "../../../components/admin-ui/orders/orderColumns";

const tabTitles = {
  "battery-market": "Battery Market",
  orders: "Orders",
  microgrids: "Microgrids",
  users: "Users",
};

type TabKeys = keyof typeof tabTitles;

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentTab, setCurrentTab] = useState<TabKeys>("battery-market");

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

  const handleTabChange = (value: string) => {
    if (value in tabTitles) {
      setCurrentTab(value as TabKeys);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold pb-8">{tabTitles[currentTab]}</h1>

      <Tabs defaultValue="battery-market" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="battery-market">Battery Market</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="microgrids">Microgrids</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent className="pt-4" value="battery-market">
          <DataTable columns={columns} data={data} />
        </TabsContent>
        <TabsContent className="pt-4" value="orders">
          <DataTable columns={columns2} data={records} />
        </TabsContent>
        <TabsContent className="pt-4" value="microgrids">
          <Microgrids />
        </TabsContent>
        <TabsContent className="pt-4" value="users">
          <UserProfilesTab />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AdminPage;
