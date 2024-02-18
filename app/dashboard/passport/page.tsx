"use client";
import { useSearchParams } from "next/navigation";
import { SohChart } from "@/components/sohChart";
import { Soh } from "@/components/soh";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    HeartIcon,
    FactoryIcon,
    BatteryIcon,
    CalendarIcon,
    StatusIcon,
} from "./icons";
import { useEffect, useState } from "react";

const PassportPage = () => {
    const searchParams = useSearchParams();
    const passportId = searchParams.get("id");
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch(`/api/battery-passports/${passportId}`)
            .then((res) => res.json())
            .then((data) => {
                setRecords(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 py-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cell Type</CardTitle>
                        <BatteryIcon />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{records.cellType}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manufacturer</CardTitle>
                        <FactoryIcon />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{records.manufacturer}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Purchased Date
                        </CardTitle>
                        <CalendarIcon />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{records.purchaseDate}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                        <StatusIcon />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{records.status}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <SohChart />
                </div>
                <Card className="col-span-3">
                    <Soh />
                </Card>
            </div>
        </div>
    );
};

export default PassportPage;
