export function cn(...classes) {
    return classes
        .flatMap((className) => {
            if (!className) return [];
            if (typeof className === "string") return className.trim();
            if (typeof className === "object") {
                return Object.entries(className)
                    .filter(([, value]) => Boolean(value))
                    .map(([key]) => key);
            }
            return [];
        })
        .join(" ")
        .trim();
}

