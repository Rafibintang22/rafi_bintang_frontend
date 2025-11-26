"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Breadcrumb({ items = [], className }) {
    return (
        <nav className={cn("text-sm text-gray-500", className)} aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={item.href ?? item.label} className="flex items-center gap-2">
                            {item.href && !isLast ? (
                                <Link href={item.href} className="transition hover:text-teal-600">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="font-medium text-gray-700">{item.label}</span>
                            )}
                            {!isLast && <span className="text-gray-300">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

