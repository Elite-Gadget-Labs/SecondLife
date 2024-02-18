"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        // Retrieve the role from localStorage
        const role = localStorage.getItem("role");
        setUserRole(role);
    }, []);

    return (
        <header className="bg-slate-950 text-white border-b border-slate-600">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className="block text-xl font-bold " href="/dashboard">
                            SECOND LIFE
                        </Link>
                    </div>

                    {userRole === "ADMIN" && (
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-white">
                                <li>
                                    <Link href="/dashboard/admin" className="">
                                        Admin Panel
                                    </Link>
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
