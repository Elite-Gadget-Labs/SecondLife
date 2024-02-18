import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BatteryInventory } from "@/components/battery-inventory";
import { BatteryOrders } from "@/components/battery-orders";

const AdminPage = () => {
  return (
    <Tabs defaultValue="battery-market" >
      <TabsList>
        <TabsTrigger value="battery-market">Battery Market</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="orders">
        <BatteryOrders />
      </TabsContent>
      <TabsContent value="battery-market">
        <BatteryInventory />
      </TabsContent>
    </Tabs>
  );
};

export default AdminPage;
