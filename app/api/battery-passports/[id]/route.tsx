import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// request a specific battery passport by its id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const batteryPassport = await prisma.batteryPassport.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!batteryPassport)
    return NextResponse.json(
      { error: "Battery Passport not found" },
      { status: 404 }
    );
  return NextResponse.json(batteryPassport, { status: 201 }); // 201 = Created
}

// update a specific Battery passport by its id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const batteryPassport = await prisma.batteryPassport.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!batteryPassport)
    return NextResponse.json(
      { error: "Battery Passport not found" },
      { status: 404 }
    ); // 404 = Not Found

  const updatedBatteryPassport = await prisma.batteryPassport.update({
    where: { id: batteryPassport.id },
    data: {
      soh: body.soh,
    },
  });

  return NextResponse.json(updatedBatteryPassport); // 200 = OK
}
