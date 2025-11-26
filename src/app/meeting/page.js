import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Table from "@/components/Table";

import { getMeetings } from "@/services/meetingService";

const columns = [
    { key: "unit", label: "Unit" },
    { key: "ruang", label: "Ruang Meeting" },
    {
        key: "kapasitas",
        label: "Kapasitas",
        render: (value) => {
            if (!value) return "-";
            if (typeof value === "number") return `${value} Orang`;
            return value;
        },
    },
    {
        key: "tanggal",
        label: "Tanggal Rapat",
        render: (value) =>
            value
                ? new Date(value).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                  })
                : "-",
    },
    {
        key: "waktu",
        label: "Waktu",
    },
    {
        key: "peserta",
        label: "Jumlah Peserta",
        render: (value) => {
            if (!value && value !== 0) return "-";
            if (typeof value === "number") return `${value} Orang`;
            return value;
        },
    },
    {
        key: "konsumsi",
        label: "Jenis Konsumsi",
        render: (_, row) => (
            <div className="flex flex-col text-gray-700">
                {(Array.isArray(row.konsumsi) && row.konsumsi.length > 0
                    ? row.konsumsi
                    : ["-"]
                ).map((item, index) => (
                    <span key={index}>{item}</span>
                ))}
            </div>
        ),
    },
];

export default async function MeetingPage() {
    let meetings = [];

    try {
        meetings = await getMeetings();
    } catch (error) {
        console.error("Failed to fetch meetings:", error);
    }

    const formattedData = (meetings || []).map((meeting) => ({
        ...meeting,
        tanggal: meeting.tanggalRapat,
        konsumsi: meeting.konsumsiList.map((k) => k.nama_konsumsi),
        peserta: meeting.jumlahPeserta + " Orang",
        unit: meeting.unit.nama_unit,
        kapasitas: meeting.ruangMeeting.kapasitas + " Orang",
        ruang: meeting.ruangMeeting.nama_ruangan,
        waktu: `${meeting.waktuMulai ?? "-"} s/d ${meeting.waktuSelesai ?? "-"}`,
    }));

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Ruang Meeting</h1>
                    <Breadcrumb items={[{ label: "Ruang Meeting" }]} className="mt-1" />
                </div>

                <div className="ml-auto">
                    <Link href="/meeting/create">
                        <Button className="gap-2">
                            <span className="text-lg">+</span> Pesan Ruangan
                        </Button>
                    </Link>
                </div>
            </div>

            <Card className="overflow-hidden p-0">
                <div className="p-6">
                    <Table
                        columns={columns}
                        data={formattedData}
                        className="border-none shadow-none"
                    />
                </div>

                {/* pagination sementara */}
                <div className="flex flex-col gap-4 border-t border-gray-100 bg-white px-6 py-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
                    <p>
                        Showing{" "}
                        <span className="font-semibold text-gray-700">
                            1 - {formattedData.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-700">{formattedData.length}</span>
                    </p>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 hover:text-teal-600"
                        >
                            &lt; Back
                        </button>

                        <button
                            type="button"
                            className="rounded-lg border border-teal-500 bg-teal-500/10 px-3 py-2 text-sm font-semibold text-teal-600"
                        >
                            1
                        </button>

                        <button
                            type="button"
                            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 hover:text-teal-600"
                        >
                            Next &gt;
                        </button>
                    </div>
                </div>
            </Card>
        </section>
    );
}
