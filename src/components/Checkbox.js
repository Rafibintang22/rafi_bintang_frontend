"use client";

import { cn } from "@/lib/utils";

export default function Checkbox({ label, checked, onChange, className, ...props }) {
    return (
        <label className={cn("flex items-center gap-3 text-sm font-medium text-gray-700", className)}>
            <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                checked={checked}
                onChange={(event) => onChange?.(event.target.checked)}
                {...props}
            />
            <span>{label}</span>
        </label>
    );
}

