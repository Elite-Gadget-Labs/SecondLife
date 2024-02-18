import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// request a list of all orders
export async function GET(request: NextRequest) {
  const orders = await prisma.order.findMany();
  return NextResponse.json(orders);
}

// request to create a new order
export async function POST(request: NextRequest) {
  const body = await request.json();

  const order = await prisma.order.findUnique({
    where: {
      id: body.id,
    },
  });

  if (order)
    return NextResponse.json(
      { error: "Order already exists" },
      { status: 400 }
    );

  const newOrder = await prisma.order.create({
    data: {
      orderDate: body.orderDate,
      orderStatus: body.orderStatus,
      batteryType: body.batteryType,
      desiredSohRange: body.desiredSohRange,
      orderAmount: body.orderAmount,
      waitTimeMonths: body.waitTimeMonths,
    },
  });

  return NextResponse.json(newOrder, { status: 201 });
}
