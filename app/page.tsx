"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BatteryIcon,
  RefreshCwIcon,
  LayoutGridIcon,
  CarIcon,
  LogInIcon,
  CheckIcon,
  FactoryIcon,
} from "lucide-react";
import { LampContainer } from "@/components/landing-ui/LampContainer";
import { BentoGrid, BentoGridItem } from "@/components/shadcn-ui/bento-grid";

const items = [
  {
    title: "Collect",
    description: "We collect old EV batteries from various sources.",
    header: <BatteryIcon className="text-green-400 w-full h-full stroke-1" />,
  },
  {
    title: "Repurpose",
    description:
      "The batteries are repurposed for their second life as a microgrid.",
    header: <RefreshCwIcon className="text-green-400 w-full h-full stroke-1" />,
  },
  {
    title: "Build",
    description:
      "We build efficient and sustainable microgrids from the repurposed batteries.",
    header: (
      <LayoutGridIcon className="text-green-400 w-full h-full stroke-1" />
    ),
  },
  {
    title: "EV Owners: Pledge Your Batteries",
    description:
      " Discover how your old EV batteries can be utilized in their second life. With potential capacity suitable for applications such as microgrids and power storage, selling your old batteries not only contributes to sustainable energy solutions but also earns you extra income.",
    header: <CarIcon className="text-green-400 w-full h-full stroke-1" />,
  },
  {
    title: "Register",
    description: "Register your EV vehicle for pledging.",
    header: <LogInIcon className="text-green-400 w-full h-full stroke-1" />,
  },
  {
    title: "Deliver",
    description: "The microgrids are delivered to industries for use.",
    header: <CheckIcon className="text-green-400 w-full h-full stroke-1" />,
  },
  {
    title: "Industries: Preorder a Microgrid",
    description:
      "Preorder a microgrid from EV battery pledgers. Repurposed EV batteries are not only cost-effective but also environmentally sustainable. Industries such as hospitals, manufacturing plants, and data centers can greatly benefit from microgrids.",
    header: <FactoryIcon className="text-green-400 w-full h-full stroke-1" />,
  },
];

const LandingPage = () => {
  return (
    <div className="bg-slate-950">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Give your battery <br /> a{" "}
          <span className="text-7xl text-green-500">second life</span> in a
          microgrid
        </motion.h1>
      </LampContainer>

      <BentoGrid className="max-w-6xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={
              i === 3 || i === 6
                ? "md:col-span-2 border border-green-500"
                : "border border-green-500"
            }
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default LandingPage;
