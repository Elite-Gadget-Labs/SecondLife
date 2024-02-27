import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const organizations = await clerkClient.organizations.getOrganizationList();

    if (organizations.length === 0) {
      // Handle the case where no organizations are found
      return NextResponse.json(
        { message: "No organizations found" },
        { status: 404 }
      );
    }

    const organizationId = organizations[0].id;
    const membershipParams = {
      organizationId,
    };

    const memberships =
      await clerkClient.organizations.getOrganizationMembershipList(
        membershipParams
      );

    const filteredMemberships = memberships.map((member) => ({
      // Convert roles to uppercase format
      role: convertRole(member.role),
      clerkId: member.publicUserData?.userId,
      email: member.publicUserData?.identifier,
      hasImage: member.publicUserData?.hasImage,
      imageUrl: member.publicUserData?.imageUrl,
    }));

    return NextResponse.json(filteredMemberships, { status: 200 });
  } catch (error) {
    console.error("Error fetching organization data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

function convertRole(role: string) {
  if (role === "org:admin") {
    return "ADMIN";
  } else if (role === "org:member") {
    return "MEMBER";
  } else {
    return role;
  }
}
