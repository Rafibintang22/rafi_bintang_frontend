"use client";

import { cn } from "@/lib/utils";

export default function Select({
    label,
    options = [],
    placeholder = "Pilih",
    required,
    className,
    onChange,
    ...props
}) {
    const handleChange = (e) => {
        const value = e.target.value;
        if (onChange) {
            onChange(value); // ⬅ Kirim langsung value
        }
    };

    return (
        <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">
            {label && (
                <span>
                    {label} {required && <span className="text-rose-500">*</span>}
                </span>
            )}

            <div
                className={cn(
                    "relative rounded-lg border px-3 py-2 shadow-sm transition",
                    props.disabled
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-gray-300",
                    className
                )}
            >
                <select
                    className={cn(
                        "w-full appearance-none border-none bg-transparent pr-6 text-sm font-medium text-gray-700 placeholder:text-gray-400 focus:outline-none",
                        props.disabled && "text-gray-400 cursor-not-allowed"
                    )}
                    onChange={handleChange}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                <svg
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                >
                    <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </label>
    );
}
