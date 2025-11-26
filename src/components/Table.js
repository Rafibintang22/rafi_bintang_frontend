import { cn } from "@/lib/utils";

export default function Table({ columns = [], data = [], className }) {
    return (
        <div className={cn("overflow-hidden rounded-2xl", className)}>
            <div className="overflow-x-auto">
                <table className="w-full min-w-max table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={row.id ?? rowIndex} className="border-t border-gray-100 hover:bg-teal-50/50">
                                {columns.map((column) => (
                                    <td key={column.key} className="px-6 py-4 text-sm text-gray-700">
                                        {column.render ? column.render(row[column.key], row) : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

