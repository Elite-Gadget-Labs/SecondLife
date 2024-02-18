import { LampDemo } from "@/components/ui/lamp";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

import { BatteryInventory } from "@/components/battery-inventory";
import { BatteryOrders } from "@/components/battery-orders";




export default function Home() {
  return (
    <main>
      {/* <BatteryOrders /> */}
      {/* <BatteryInventory /> */}
      <LampDemo />
    </main>
  );
}

