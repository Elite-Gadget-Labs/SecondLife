"use-client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Progress } from "@radix-ui/react-progress";

export default function BatteryInfo() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Battery Information</CardTitle>
        <CardDescription>
          Detailed information about your device's battery.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-4">
          <BatteryIcon className="w-6 h-6" />
          <div className="space-y-1">
            <h3 className="font-semibold">Cell Type</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lithium-ion
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FactoryIcon className="w-6 h-6" />
          <div className="space-y-1">
            <h3 className="font-semibold">Manufacturer</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Samsung SDI
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <BatteryFullIcon className="w-6 h-6" />
          <div className="space-y-1">
            <h3 className="font-semibold">Capacity</h3>
            {/* <Progress value={80} /> */}
            <p className="text-sm text-gray-500 dark:text-gray-400">80%</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-6 h-6" />
          <div className="space-y-1">
            <h3 className="font-semibold">Age</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              1 year 3 months
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <HeartIcon className="w-6 h-6" />
          <div className="space-y-1">
            <h3 className="font-semibold">Current Health</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Good</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function BatteryFullIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
      <line x1="22" x2="22" y1="11" y2="13" />
      <line x1="6" x2="6" y1="11" y2="13" />
      <line x1="10" x2="10" y1="11" y2="13" />
      <line x1="14" x2="14" y1="11" y2="13" />
    </svg>
  );
}

function BatteryIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
      <line x1="22" x2="22" y1="11" y2="13" />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function FactoryIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </svg>
  );
}

function HeartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
