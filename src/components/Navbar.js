"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar({ className }) {
    return (
        <header className={cn("gradient-header text-white", className)}>
            <div className="flex items-center justify-between px-20 py-3">
                <div className="flex items-center gap-3">
                    <Image
                        src="/Logo-FTL-no-tagline 1.png"
                        alt="Logo FTL"
                        width={100}
                        height={100}
                    />
                    <div>
                        <p className="text-lg font-semibold leading-tight">iMeeting</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Image src="/bell.png" alt="bell" width={20} height={20}></Image>
                        <Image src="/Ellipse 1.png" alt="avatar" width={40} height={40}></Image>
                        <div className="text-right">
                            <p className="text-sm font-semibold leading-tight">John Doe</p>
                        </div>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            className="h-5 w-5 text-white/80"
                        >
                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </header>
    );
}
