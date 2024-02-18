import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// request a list of all battery passports
export async function GET(request: NextRequest) {
  const allBatteryPassports = await prisma.batteryPassport.findMany();
  return NextResponse.json(allBatteryPassports);
}