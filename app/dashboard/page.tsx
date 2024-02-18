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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";

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
}

const Dashboard = () => {
  const Router = useRouter();
  const [records, setRecords] = useState<RecordItem[]>([]);
  const { isSignedIn, user } = useUser();

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
      model: EV_MODELS[0],
      purchaseDate: "",
      homeAddress: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const additionalData = {
      clerkId: user?.id,
      soh: getRandomSoH(),
      cellType: getRandomElement(CELL_TYPE),
      manufacturer: getRandomElement(MANUFACTURER),
    };

    const postData = {
      ...values,
      ...additionalData,
    };

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
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const getImagePath = (modelName: string) => {
    return `/ev-images/${modelName}.png`; // Example path, adjust as necessary
  };

  return (
    <>
      <div className="border-b border-gray-200 pb-5 flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Your Registered EVs
        </h3>
        <div className="sm:ml-4">
          <Dialog>
            <DialogTrigger className="inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
              Register a New EV
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
      <div className="grid grid-cols-1 md:grid-cols-1 gap-x-6 py-4 pt-0">
        {records.map((item) => {
          const imagePath = getImagePath(item.model);
          const queryParameters = new URLSearchParams({
            id: item.id,
          }).toString();

          return (
            <Link href={`/dashboard/passport?${queryParameters}`} key={item.id}>
              <div
                className={cn(
                  "flex items-center gap-4 my-4 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
                )}
              >
                <img
                  src={imagePath}
                  alt={item.model}
                  className="w-60 object-cover"
                />
                <div>
                  <div className="font-semibold">
                    {item.model.replace("_", " ")}
                  </div>
                  <div className="text-xs">{item.purchaseDate}</div>
                  <div className="text-xs">{item.homeAddress}</div>
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
