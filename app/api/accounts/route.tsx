import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

// request to create a new account
export async function POST(request: NextRequest) {
  const body = await request.json();

  const account = await prisma.account.findUnique({
    where: {
      clerkId: body.clerkId,
    },
  });

  if (account)
    return NextResponse.json(
      { error: "Account already exists" },
      { status: 400 }
    );

  const newAccount = await prisma.account.create({
    data: {
      clerkId: body.clerkId,
    },
  });

  return NextResponse.json(newAccount, { status: 201 });
}
