"use client";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

// export const metadata: Metadata = {
//   title: "Dashboard - Second Life",
// };

export default function HomeLayout({
    children, // will be a page or nested layout
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
        <section>
            <Navbar />
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
}
