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
