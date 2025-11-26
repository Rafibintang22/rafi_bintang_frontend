"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
    {
        href: "/meeting",
        label: "Ruang Meeting",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            >
                <path
                    d="M3 9.5 12 3l9 6.5V21a1 1 0 0 1-1 1h-5.5v-5.25a1.5 1.5 0 0 0-3 0V22H4a1 1 0 0 1-1-1z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        href: "/nonaktif",
        label: "Pesan Ruangan",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
            >
                <circle cx="12" cy="7.5" r="4" strokeLinecap="round" strokeLinejoin="round" />
                <path
                    d="M5 21c0-3.9 3.134-7 7-7s7 3.1 7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "bg-white border-r border-gray-100 shadow-sm flex flex-col items-center py-6 transition-all duration-200",
                "fixed inset-y-0 left-0 z-30 md:static",
                collapsed ? "w-16" : "w-24"
            )}
        >
            <button
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                className="mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 md:hidden"
                aria-label="Toggle sidebar"
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                >
                    <path
                        d="M4 6h16M4 12h16M4 18h10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <nav className="flex flex-1 flex-col items-center gap-6">
                {navItems.map((item) => {
                    const active = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex h-12 w-12 items-center justify-center rounded-xl border text-gray-500 transition",
                                active
                                    ? "bg-[#4A8394] text-white"
                                    : "border-transparent hover:border-gray-200 hover:bg-gray-50"
                            )}
                            aria-label={item.label}
                        >
                            {item.icon}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
