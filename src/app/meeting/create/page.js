"use client";

import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Card";
import Select from "@/components/Select";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";

import { getUnits } from "@/services/unitService";
import { getRuangMeetings } from "@/services/ruangMeetingService";
import { getJenisKonsumsi } from "@/services/jenisKonsumsiService";
import { createMeeting } from "@/services/meetingService";
import Link from "next/link";

const timeOptions = [
    { value: "08:00", label: "08:00" },
    { value: "09:00", label: "09:00" },
    { value: "10:00", label: "10:00" },
    { value: "11:00", label: "11:00" },
    { value: "12:00", label: "12:00" },
    { value: "13:00", label: "13:00" },
    { value: "14:00", label: "14:00" },
    { value: "15:00", label: "15:00" },
];

const initialForm = {
    unit: "",
    room: "",
    capacity: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: "",
    consumption: [],
    nominal: "",
};

export default function CreateMeetingPage() {
    const [form, setForm] = useState(initialForm);
    const [units, setUnits] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [consumptions, setConsumptions] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [error, setError] = useState(null);

    console.log(form);

    // Fetch semua data referensi
    useEffect(() => {
        let active = true;

        (async () => {
            try {
                const [unitData, roomData, consumptionData] = await Promise.all([
                    getUnits(),
                    getRuangMeetings(),
                    getJenisKonsumsi(),
                ]);

                if (!active) return;

                setUnits(unitData);

                const uniqueRooms = Array.from(
                    new Map(
                        roomData.map((r) => [
                            r.id,
                            {
                                id: r.id,
                                nama_ruang: r.nama_ruangan,
                                kapasitas: r.kapasitas,
                                unitId: r.unitId,
                            },
                        ])
                    ).values()
                );

                setRooms(uniqueRooms);

                setConsumptions(consumptionData);
            } catch (err) {
                setError("Gagal memuat data referensi. Silakan coba lagi.");
            } finally {
                if (active) setLoadingOptions(false);
            }
        })();

        return () => (active = false);
    }, []);

    // Update field
    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    // Toggle konsumsi
    const toggleConsumption = (value) => {
        setForm((prev) => {
            const exists = prev.consumption.includes(value);
            return {
                ...prev,
                consumption: exists
                    ? prev.consumption.filter((id) => id !== value)
                    : [...prev.consumption, value],
            };
        });
    };

    // Options untuk select
    const unitOptions = useMemo(
        () =>
            units.map((unit) => ({
                value: String(unit.id),
                label: unit.nama_unit ?? `Unit ${unit.id}`,
            })),
        [units]
    );

    const roomOptions = useMemo(() => {
        const filtered = form.unit ? rooms.filter((r) => String(r.unitId) === form.unit) : rooms;

        return filtered.map((room) => ({
            value: String(room.id),
            label: room.nama_ruang,
            capacity: room.kapasitas,
        }));
    }, [rooms, form.unit]);

    const consumptionOptions = useMemo(
        () =>
            consumptions.map((item) => ({
                value: String(item.id),
                label: item.nama_konsumsi,
            })),
        [consumptions]
    );

    // Event handlers
    const handleUnitChange = (value) => {
        updateField("unit", value);
        updateField("room", "");
        updateField("capacity", "");
    };

    const handleRoomChange = (value) => {
        updateField("room", value);
        const selectedRoom = rooms.find((r) => String(r.id) === value);
        updateField("capacity", selectedRoom?.kapasitas ? `${selectedRoom.kapasitas} Orang` : "");
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setFeedback(null);
        setError(null);

        try {
            const payload = {
                unitId: Number(form.unit),
                ruangMeetingId: Number(form.room),
                tanggalRapat: form.date,
                waktuMulai: form.startTime,
                waktuSelesai: form.endTime,
                jumlahPeserta: Number(form.participants),
                nominalKonsumsi: form.nominal ? Number(form.nominal) : null,
                konsumsiIds: form.consumption.map(Number),
            };

            await createMeeting(payload);

            setFeedback("Meeting berhasil disimpan.");
            setForm(initialForm);
        } catch (err) {
            setError("Gagal menyimpan meeting. Periksa input Anda.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/meeting">
                    <button
                        type="button"
                        className="cursor-pointer inline-flex h-12 w-12 items-center justify-center rounded-xl border  border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-[#4A8394] hover:text-white  active:bg-[#264f63] focus-visible:outline-none  focus-visible:ring-2  focus-visible:ring-[#4A8394]  focus-visible:ring-offset-2"
                        aria-label="Back"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-5 w-5"
                        >
                            <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Ruang Meeting</h1>
                    <Breadcrumb
                        items={[
                            { label: "Ruang Meeting", href: "/meeting" },
                            { label: "Pesan Ruangan" },
                        ]}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {feedback && <p className="text-teal-600">{feedback}</p>}
                {error && <p className="text-red-600">{error}</p>}

                <Card className="space-y-8 p-6">
                    {/* Informasi Ruangan */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold">Informasi Ruang Meeting</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Select
                                label="Unit"
                                placeholder="Pilih Unit"
                                options={unitOptions}
                                value={form.unit}
                                onChange={(v) => handleUnitChange(v)}
                                required
                            />
                            <Select
                                label="Ruangan"
                                placeholder="Pilih Ruangan Meeting"
                                options={roomOptions}
                                value={form.room}
                                onChange={(v) => handleRoomChange(v)}
                                disabled={!form.unit}
                                required
                            />
                            <Input label="Kapasitas" value={form.capacity || "-"} disabled={true} />
                        </div>
                    </div>

                    <hr className="border-dashed" />

                    {/* Informasi Rapat */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold">Informasi Rapat</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Input
                                label="Tanggal Rapat"
                                type="date"
                                value={form.date}
                                onChange={(e) => updateField("date", e.target.value)}
                                required
                            />
                            <Select
                                label="Waktu Mulai"
                                options={timeOptions}
                                value={form.startTime}
                                onChange={(v) => updateField("startTime", v)}
                                required
                            />
                            <Select
                                label="Waktu Selesai"
                                options={timeOptions}
                                value={form.endTime}
                                onChange={(v) => updateField("endTime", v)}
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Jumlah Peserta"
                                type="number"
                                value={form.participants}
                                onChange={(e) => updateField("participants", e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <p className="font-semibold">Jenis Konsumsi</p>
                            <div className="grid grid-cols-1 gap-3">
                                {consumptionOptions.map((item) => (
                                    <Checkbox
                                        key={item.value}
                                        label={item.label}
                                        checked={form.consumption.includes(item.value)}
                                        onChange={() => toggleConsumption(item.value)}
                                    />
                                ))}
                            </div>
                        </div>
                        <Input
                            label="Nominal Konsumsi"
                            type="number"
                            prefix="Rp"
                            value={form.nominal}
                            onChange={(e) => updateField("nominal", e.target.value)}
                        />
                    </div>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="danger" onClick={() => setForm(initialForm)}>
                        Batal
                    </Button>
                    <Button type="submit" disabled={submitting}>
                        {submitting ? "Menyimpan..." : "Simpan"}
                    </Button>
                </div>
            </form>
        </section>
    );
}
