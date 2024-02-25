"use client";
import { Metadata } from "next";
import Navbar from "@/components/dashboard-ui/navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import Footer from "@/components/dashboard-ui/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, user } = useUser();

  let userId = {
    clerkId: user?.id,
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userId),
      });
      const data = await response.json();
      if (data && data.role) {
        localStorage.setItem("role", data.role);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      getUserInfo().then();
    }
  }, [isSignedIn]);

  return (
    <section className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </section>
  );
}
