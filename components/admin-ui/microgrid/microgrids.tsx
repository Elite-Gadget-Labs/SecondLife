"use client";
import React, { useState } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { Label } from "@/components/shadcn-ui/label";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/shadcn-ui/card";

// Define a type for the microgrid objects
interface Microgrid {
  cellType: string;
  numPacks: number;
  waitTime: string;
  voltage: number;
  capacityAh: number;
}

export function Microgrids() {
  const [desiredKwh, setDesiredKwh] = useState("");
  const [waitTime, setWaitTime] = useState("");
  const [microgrids, setMicrogrids] = useState<Microgrid[]>([]);

  const cellTypesInfo = {
    LITHIUM_ION: { pack_voltage: 400, pack_capacity_ah: 200 },
    NICKEL_METAL_HYDRIDE: { pack_voltage: 300, pack_capacity_ah: 120 },
    LITHIUM_POLYMER: { pack_voltage: 370, pack_capacity_ah: 180 },
    LITHIUM_IRON_PHOSPHATE: { pack_voltage: 320, pack_capacity_ah: 160 },
  };

  async function generateMicrogrids(event: any) {
    event.preventDefault();

    const calculatedMicrogrids = Object.entries(cellTypesInfo).map(
      ([cellType, specs]) => {
        const numPacks = Math.ceil(
          (Number(desiredKwh) * 1000) /
            (specs.pack_voltage * specs.pack_capacity_ah)
        );
        return {
          cellType,
          numPacks,
          waitTime,
          voltage: specs.pack_voltage,
          capacityAh: specs.pack_capacity_ah,
        };
      }
    );

    setMicrogrids(calculatedMicrogrids);
  }

  async function createOrder(gridData: Microgrid) {
    console.log("griddata", gridData);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gridData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Order created:", result);
      // Handle success (e.g., show a success message or update state)
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error (e.g., show an error message)
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border shadow-sm rounded-lg">
        <form className="p-4" onSubmit={generateMicrogrids}>
          <div className="space-y-2">
            <Label htmlFor="kwh">Desired kWh</Label>
            <Input
              id="kwh"
              required
              type="number"
              value={desiredKwh}
              onChange={(e) => setDesiredKwh(e.target.value)}
            />
            <Label htmlFor="waitTime">Wait Time (Months)</Label>
            <Input
              id="waitTime"
              required
              type="number"
              value={waitTime}
              onChange={(e) => setWaitTime(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-4" size="sm">
            Generate Microgrids
          </Button>
        </form>
        <div className="p-4">
          <h2 className="font-semibold text-lg md:text-xl">Microgrid List</h2>
          <div className="grid gap-4 mt-4">
            {microgrids.map((grid, index) => (
              <Card key={index}>
                <div className="flex justify-between align-middle items-center">
                  <div>
                    <CardHeader>
                      <CardTitle>Microgrid {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Battery Cell Type: {grid.cellType}</p>
                      <p>Pack Voltage: {grid.voltage} V</p>
                      <p>Pack Capacity: {grid.capacityAh} Ah</p>
                      <p>Number of Packs: {grid.numPacks}</p>
                    </CardContent>
                  </div>
                  <div className="p-8">
                    <Button onClick={() => createOrder(grid)}>
                      Create Order
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
