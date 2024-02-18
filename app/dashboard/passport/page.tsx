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
import { HeartIcon, FactoryIcon, BatteryIcon, CalendarIcon } from "./icons";
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
                        <div className="text-2xl font-bold">$45,231.89</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Manufacturer</CardTitle>
                        <FactoryIcon />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Age</CardTitle>
                        <CalendarIcon />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+12,234</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Current Health
                        </CardTitle>
                        <HeartIcon />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+573</div>
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
