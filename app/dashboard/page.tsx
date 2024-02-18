"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const formSchema = z.object({
    brand: z.string().min(2).max(50),
    model: z.string().min(2).max(50),
    purchaseDate: z.string().min(2).max(50),
    homeAddress: z.string().min(2).max(50),
});

const Dashboard = () => {
    const Router = useRouter();
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetch("/api/battery-passports")
            .then((res) => res.json())
            .then((data) => {
                setRecords(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            brand: "",
            model: "",
            purchaseDate: "",
            homeAddress: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <>
            {" "}
            <div className="border-b border-gray-200 pb-5 flex items-center justify-between">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Your Registered EVs
                </h3>
                <div className="sm:ml-4">
                    <Dialog>
                        <DialogTrigger className="inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                            Register your EVs
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="pb-4">EV Information</DialogTitle>
                                <DialogDescription>
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(onSubmit)}
                                            className="space-y-8"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="brand"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Brand</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Tesla" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="model"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Model</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Model S" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="purchaseDate"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Purchase Date</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="2024-02-17" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="homeAddress"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Home Address</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="1232 Curry Ave. Windsor ON"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit">Add EV</Button>
                                        </form>
                                    </Form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-x-6 py-4 pt-0">
                {records.map((item) => {
                    const queryParameters = new URLSearchParams({
                        id: item.id,
                    }).toString();
                    return (
                        <Link
                            href={`/dashboard/passport?${queryParameters}`}
                            key={item.id}
                            className={cn(
                                "flex flex-col items-start gap-2 my-4 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                            )}
                        >
                            <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold">
                                            {item.brand} {item.model}
                                        </div>
                                    </div>
                                    <div className={cn("ml-auto text-xs")}>{item.status}</div>
                                </div>
                                <div className="text-xs font-medium">
                                    Purchased on: {item.purchaseDate}
                                </div>
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                {item.homeAddress}
                            </div>{" "}
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Dashboard;
