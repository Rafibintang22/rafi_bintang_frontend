"use client";

import { cn } from "@/lib/utils";

const variants = {
    primary: "bg-[#4A8394] text-white hover:bg-[#264f63] focus-visible:ring-[#4A8394]",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-300",
    danger: "bg-rose-100 text-rose-600 hover:bg-rose-200 focus-visible:ring-rose-200",
};

export default function Button({ children, className, variant = "primary", ...props }) {
    return (
        <button
            className={cn(
                "cursor-pointer inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                variants[variant] ?? variants.primary,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
