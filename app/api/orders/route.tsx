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
    const today = new Date();
    const todayDate = today.toISOString().split("T")[0];

    const newOrder = await prisma.order.create({
        data: {
            orderDate: todayDate,
            batteryType: body.cellType,
            orderAmount: body.numPacks,
            waitTimeMonths: Number(body.waitTime),
        },
    });

    return NextResponse.json(newOrder, { status: 201 });
}
