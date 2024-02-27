"use client";
import React, { useEffect, useState } from "react"; // Corrected imports
import Link from "next/link";

import {
  SignedOut,
  UserButton,
  useUser,
  SignedIn,
  useSession,
} from "@clerk/nextjs";
import { checkUserRole } from "@/lib/userUtils";

const Navbar = () => {
  const [userRole, setUserRole] = useState("");
  const { isLoaded: isSessionLoaded, session } = useSession();

  useEffect(() => {
    if (isSessionLoaded) {
      if (session) {
        const _userRole = checkUserRole(session);
        if (_userRole === "org:admin") {
          setUserRole("ADMIN");
        } else if (_userRole === "org:member") {
          setUserRole("MEMBER");
        }
      } else {
        return;
      }
    }
  }, [isSessionLoaded, session]);

  return (
    <header className="bg-slate-950 text-white border-b border-slate-600">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link href="/dashboard" className="block text-xl font-bold">
              SECOND LIFE
            </Link>
          </div>

          {userRole === "ADMIN" && (
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm text-white">
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
