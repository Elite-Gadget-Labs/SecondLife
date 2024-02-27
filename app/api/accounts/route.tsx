import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import clerkClient from "@clerk/clerk-sdk-node";

// Request a list of all accounts
export async function GET(request: NextRequest) {
  // Fetch all accounts from Prisma
  const allAccounts = await prisma.account.findMany();

  // Fetch additional member data from Clerk
  const enhancedAccounts = await Promise.all(
    allAccounts.map(async (account) => {
      try {
        const memberData = await clerkClient.users.getUser(account.clerkId);
        // Combine Prisma account data with Clerk member data
        return {
          ...account,
          firstName: memberData.firstName,
          lastName: memberData.lastName,
          email: memberData.emailAddresses[0].emailAddress,
        };
      } catch (error) {
        console.error("Error fetching Clerk member data:", error);
        return account; // Return the original account data if Clerk data can't be fetched
      }
    })
  );

  return NextResponse.json(enhancedAccounts, { status: 200 });
}

// request to create a new account
export async function POST(request: NextRequest) {
  const body = await request.json();

  const account = await prisma.account.findUnique({
    where: {
      clerkId: body.clerkId,
    },
  });

  if (account) return NextResponse.json(account, { status: 201 });

  const newAccount = await prisma.account.create({
    data: {
      clerkId: body.clerkId,
    },
  });

  return NextResponse.json(newAccount, { status: 201 });
}
