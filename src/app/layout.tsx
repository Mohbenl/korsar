import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AdminProvider } from "@/contexts/AdminContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Korsar",
    description: "Plateforme e-commerce Korsar",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className="h-full">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden min-h-full`}
        >
        <AdminProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </AdminProvider>
        </body>
        </html>
    );
}