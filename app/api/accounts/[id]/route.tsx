import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// update a specific user by their id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const account = await prisma.account.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!account)
    return NextResponse.json({ error: "Account not found" }, { status: 404 });

  const updatedAccount = await prisma.account.update({
    where: { id: account.id },
    data: {
      role: body.role,
    },
  });

  return NextResponse.json(updatedAccount);
}
