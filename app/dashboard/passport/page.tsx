"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SohChart } from "@/components/sohChart";
import { Soh } from "@/components/soh";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BatteryIcon, FactoryIcon, CalendarIcon, StatusIcon } from "./icons";

interface RecordType {
  cellType: string;
  manufacturer: string;
  purchaseDate: string;
  status: string;
  soh: number;
}

const PassportPage = () => {
  const searchParams = useSearchParams();
  const passportId = searchParams.get("id");
  const [record, setRecord] = useState<RecordType | undefined>();

  useEffect(() => {
    fetch(`/api/battery-passports/${passportId}`)
      .then((res) => res.json())
      .then((data) => {
        setRecord(data);
      })
      .catch((err) => console.log(err));
  }, [passportId]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cell Type</CardTitle>
            <BatteryIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{record?.cellType}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manufacturer</CardTitle>
            <FactoryIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{record?.manufacturer}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Purchase Date
            </CardTitle>
            <CalendarIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{record?.purchaseDate}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <StatusIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{record?.status}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <SohChart />
        </div>
        <Card className="col-span-3">
          <Soh sohValue={record?.soh ?? 0} />
        </Card>
      </div>
    </div>
  );
};

export default PassportPage;
