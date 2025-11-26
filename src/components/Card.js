import { cn } from "@/lib/utils";

export default function Card({ className, children }) {
    return <div className={cn("rounded-2xl border border-gray-200 bg-white card-shadow", className)}>{children}</div>;
}

