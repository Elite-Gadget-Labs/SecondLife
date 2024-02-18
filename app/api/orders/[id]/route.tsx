import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// update a specific order by its id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const order = await prisma.order.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!order)
    return NextResponse.json({ error: "Order not found" }, { status: 404 }); // 404 = Not Found

  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: {
      orderDate: body.orderDate,
      orderStatus: body.orderStatus,
      batteryType: body.batteryType,
      desiredSohRange: body.desiredSohRange,
      orderAmount: body.orderAmount,
      waitTimeMonths: body.waitTimeMonths,
    },
  });

  return NextResponse.json(updatedOrder); // 200 = OK
}
