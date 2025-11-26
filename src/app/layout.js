import "./globals.css";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
    title: "FTL iMeeting",
    description: "Dashboard pemesanan ruang meeting",
};

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <body className={`${inter.className} bg-[var(--background)] text-gray-900 antialiased`}>
                <div className="flex min-h-screen flex-col bg-[var(--background)] text-gray-900">
                    <Navbar />
                    <main className="flex flex-1 justify-start">
                        <Sidebar />
                        <div className="mx-auto mt-12 mb-12 w-full max-w-6xl">{children}</div>
                    </main>
                </div>
            </body>
        </html>
    );
}
