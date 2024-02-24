"use client";
import React, { useEffect, useState } from "react";
import { useOrganizationList } from "@clerk/nextjs";
import { UserProfilesTable } from "./UserProfilesTable";
import userProfilesColumns from "./userProfilesColumns";
import { AccountData } from "./types";

const UserProfilesTab = () => {
  const [userProfiles, setUserProfiles] = useState<AccountData[]>([]);
  const { isLoaded, userMemberships } = useOrganizationList({
    // Removed infinite: true to avoid continuous updates
    userMemberships: {},
  });

  useEffect(() => {
    if (!isLoaded || !userMemberships?.data) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/api/accounts");
        const accounts = await response.json();

        setUserProfiles(accounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchData();
  }, [isLoaded, userMemberships?.data]); // Now depends on userMemberships.data

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profiles</h1>
      <UserProfilesTable columns={userProfilesColumns} data={userProfiles} />
    </div>
  );
};

export default UserProfilesTab;
