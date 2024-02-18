import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs";

// request a list of all battery passports
export async function GET(request: NextRequest) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const batteryPassports = await prisma.batteryPassport.findMany({
      where: {
        clerkId: userId,
      },
    });
    return NextResponse.json(batteryPassports);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred finding battery passports" },
      { status: 500 }
    );
  }
}

// request to create a new battery passport
export async function POST(request: NextRequest) {
  const body = await request.json();

  const newBatteryPassport = await prisma.batteryPassport.create({
    data: {
      clerkId: body.clerkId,
      soh: body.soh,
      cellType: body.cellType,
      manufacturer: body.manufacturer,
      model: body.model,
      purchaseDate: body.purchaseDate,
      homeAddress: body.homeAddress,
      eolTimeMonths: body.eolTimeMonths,
    },
  });

  return NextResponse.json(newBatteryPassport, { status: 201 });
}
