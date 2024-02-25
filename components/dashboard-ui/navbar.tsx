"use client";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const { isLoaded, isSignedIn } = useUser();

  // Function to update user role and loading state
  const updateUserRole = () => {
    const role = localStorage.getItem("role");
    setUserRole(role || "");
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoaded) {
      setLoading(true);
      return;
    }

    // Delay the loading state update to ensure role is fetched
    setTimeout(updateUserRole, 500);
  }, [isLoaded, isSignedIn]);

  // Effect for listening to changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      updateUserRole();
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="bg-slate-950 text-white border-b border-slate-600">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-xl font-bold" href="/dashboard">
              SECOND LIFE
            </Link>
          </div>

          {userRole === "ADMIN" && (
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-white">
                <li>
                  <Link href="/dashboard/admin">Admin Panel</Link>
                </li>
              </ul>
            </nav>
          )}

          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
