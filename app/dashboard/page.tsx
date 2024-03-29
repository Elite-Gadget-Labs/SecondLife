"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn-ui/dialog";
import { Button } from "@/components/shadcn-ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/shadcn-ui/input";

const CELL_TYPE = [
  "LITHIUM_ION",
  "NICKEL_METAL_HYDRIDE",
  "LITHIUM_POLYMER",
  "LITHIUM_IRON_PHOSPHATE",
];

const MANUFACTURER = ["LG", "SAMSUNG", "PANASONIC"];

const EV_MODELS = [
  "TESLA_MODEL_S",
  "TESLA_MODEL_3",
  "TESLA_MODEL_X",
  "TESLA_MODEL_Y",
  "CHEVROLET_BOLT_EV",
  "NISSAN_LEAF",
  "BMW_I3",
  "AUDI_E_TRON",
  "FORD_MUSTANG_MACH_E",
  "VOLKSWAGEN_ID_4",
  "PORSCHE_TAYCAN",
  "HYUNDAI_KONA_ELECTRIC",
  "KIA_NIRO_EV",
  "MERCEDES_BENZ_EQC",
  "JAGUAR_I_PACE",
  "RIVIAN_R1T",
  "LUCID_AIR",
  "POLESTAR_2",
  "BYTON_M_BYTE",
  "FIAT_500E",
] as const;

function getRandomElement(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSoH() {
  return Math.random() * (100 - 80) + 80; // Random SoH value between 80 and 100
}

function calculateEolTimeMonths(soh: number): number {
  return Math.round(((soh - 80) / 20) * 180);
}

const formSchema = z.object({
  model: z.enum(EV_MODELS),
  purchaseDate: z.string().min(2).max(50),
  homeAddress: z.string().min(2).max(50),
});

interface RecordItem {
  id: string;
  model: string;
  purchaseDate: string;
  homeAddress: string;
  status: string;
  eolTimeMonths: number;
  cellType: string;
  manufacturer: string;
  clerkId: string;
  soh: number;
}
const Dashboard = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    fetch("/api/battery-passports")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((item: RecordItem) => ({
          ...item,
          eolTimeMonths: calculateEolTimeMonths(item.soh),
        }));
        setRecords(updatedData);
      })
      .catch((err) => console.log(err));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: EV_MODELS[0],
      purchaseDate: "",
      homeAddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const soh = getRandomSoH();
    const eolTimeMonths = calculateEolTimeMonths(soh);

    const additionalData = {
      clerkId: user?.id,
      soh,
      cellType: getRandomElement(CELL_TYPE),
      manufacturer: getRandomElement(MANUFACTURER),
      eolTimeMonths: calculateEolTimeMonths(soh),
    };

    const postData = {
      ...values,
      ...additionalData,
    };

    console.log("portdata: ", postData);

    fetch("/api/battery-passports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => window.location.reload())
      .catch((error) => console.error("Error:", error));
  }

  const getImagePath = (modelName: string) => {
    return `/ev-images/${modelName}.png`; // Example path, adjust as necessary
  };

  return (
    <>
      <div className="pb-5 flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Your Registered EVs
        </h3>
        <div className="sm:ml-4">
          <Dialog>
            <DialogTrigger className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-green-500 shadow-sm outline outline-green-500 hover:text-green-700 hover:outline-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
              Register New EV
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="pb-4">EV Information</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>EV Model</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              {EV_MODELS.map((model) => (
                                <option key={model} value={model}>
                                  {model.replace("_", " ")}
                                </option>
                              ))}
                            </select>
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
                            <Input placeholder="yyyy-mm-dd" {...field} />
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
                              placeholder="street, city, state, zip code"
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
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 py-4 pt-0">
        {records.map((item) => {
          const imagePath = getImagePath(item.model);
          const queryParameters = new URLSearchParams({
            id: item.id,
          }).toString();

          return (
            <Link
              href={`/dashboard/battery-passport?${queryParameters}`}
              key={item.id}
            >
              <div
                className={cn(
                  "flex justify-between gap-4 my-4 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
                )}
              >
                <img
                  src={imagePath}
                  alt={item.model}
                  className="w-60 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between text-end">
                  <div className="font-semibold text-xl lg:text-2xl">
                    {item.model.replace("_", " ")}
                  </div>
                  <div>
                    Time to EOL:{" "}
                    <span className="text-2xl font-bold">
                      {item.eolTimeMonths}
                    </span>{" "}
                    Months
                  </div>
                  <div>
                    <div className="text-md">{item.purchaseDate}</div>
                    <div className="text-md">{item.homeAddress}</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
