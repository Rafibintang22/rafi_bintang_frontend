"use client";

import { cn } from "@/lib/utils";

export default function Input({ label, helper, className, prefix, icon, required, ...props }) {
    const isDisabled = props.disabled;

    return (
        <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
            {label && (
                <span>
                    {label} {required && <span className="text-rose-500">*</span>}
                </span>
            )}

            <div
                className={cn(
                    "flex items-center gap-3 rounded-lg border px-3 py-2 shadow-sm transition",
                    isDisabled
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-300 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100",
                    className
                )}
            >
                {icon && <span className="text-gray-400">{icon}</span>}

                {prefix && (
                    <span className="text-sm font-semibold text-gray-500" aria-hidden="true">
                        {prefix}
                    </span>
                )}

                <input
                    {...props}
                    className={cn(
                        "w-full border-none bg-transparent text-sm font-medium placeholder:text-gray-400 focus:outline-none",
                        isDisabled && "text-gray-400 placeholder:text-gray-300 cursor-not-allowed"
                    )}
                />
            </div>

            {helper && <span className="text-xs font-normal text-gray-400">{helper}</span>}
        </label>
    );
}
