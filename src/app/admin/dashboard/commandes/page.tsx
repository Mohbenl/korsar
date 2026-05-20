"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/contexts/AdminContext";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { LogOut, ArrowLeft, Search } from "lucide-react";

import { deleteOrder, getOrders } from "@/lib/commande";
import type { Order } from "@/lib/commande";

import OrderDetailsModal from "@/components/OrderDetailsModal";
import OrdersTable from "@/components/OrdersTable";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});



const AdminCommandesPage = () => {
    const { isAuthenticated, logout } = useAdmin();
    const router = useRouter();

    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tous");
    const [currentPage, setCurrentPage] = useState(1);

    const ordersPerPage = 6;

    // ================= FETCH =================
    const refreshOrders = async () => {
        const data = await getOrders();
        setOrders(data);
    };

    useEffect(() => {
        if (!isAuthenticated) return;

        (async () => {
            const data = await getOrders();
            setOrders(data);
        })();
    }, [isAuthenticated]);

    // ================= FILTER =================
    const filteredOrders = useMemo(() => {
        return orders.filter((o) => {
            const matchSearch =
                o.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                o.prenom.toLowerCase().includes(searchTerm.toLowerCase());

            const matchStatus =
                statusFilter === "Tous" || o.statut === statusFilter;

            return matchSearch && matchStatus;
        });
    }, [orders, searchTerm, statusFilter]);

    // ================= PAGINATION =================
    const currentOrders = useMemo(() => {
        const indexOfLast = currentPage * ordersPerPage;
        const indexOfFirst = indexOfLast - ordersPerPage;
        return filteredOrders.slice(indexOfFirst, indexOfLast);
    }, [filteredOrders, currentPage]);

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    // ================= ACTIONS =================
    const handleLogout = () => {
        logout();
        router.push("/admin/login");
    };

    const handleDeleteOrder = async (id: string) => {
        await deleteOrder(id);
        const data = await getOrders();
        setOrders(data);
    };

    return (
        <div className={`${dmSans.className} bg-[#F5F3EE] min-h-screen`}>
            {/* Header */}
            <header className="bg-white border-b border-[#0B1C2D]/10 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2 text-[#0B1C2D] hover:text-[#C6A75E] transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-light text-[#0B1C2D]">
                                Gestion des Commandes
                            </h1>
                            <p className="text-xs tracking-widest uppercase text-[#C6A75E]">
                                {orders.length} commandes
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center cursor-pointer gap-2 px-6 py-3 border border-[#0B1C2D]/20 text-[#0B1C2D] hover:border-red-400 hover:text-red-400 transition-all duration-300 text-sm tracking-widest uppercase"
                    >
                        <LogOut size={16} />
                        Déconnexion
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">

                <div className="bg-white border border-[#0B1C2D]/10 p-6 mb-8 space-y-6">

                    {/* SEARCH */}
                    <div className="relative w-full md:w-1/3">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1C2D]/40"
                        />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-12 pr-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none text-[#0B1C2D] transition-all duration-300"
                        />
                    </div>

                    {/* FILTER */}
                    <div className="flex gap-2">
                        {["Tous", "En Attente", "shipped", "completed"].map((s) => (
                            <button
                                key={s}
                                onClick={() => {
                                    setStatusFilter(s);
                                    setCurrentPage(1);
                                }}
                                className={`px-3 py-2 text-xs tracking-widest uppercase border transition ${
                                    statusFilter === s
                                        ? "bg-[#0B1C2D] text-white"
                                        : "border-[#0B1C2D]/20 text-[#0B1C2D]"
                                }`}
                            >
                                {s === "En Attente"
                                    ? "En Attente"
                                    : s === "shipped"
                                        ? "Expédiée"
                                        : s === "completed"
                                            ? "Complétée"
                                            : "Tous"}
                            </button>
                        ))}
                    </div>
                </div>

                <OrdersTable
                    currentOrders={currentOrders}
                    setSelectedOrder={setSelectedOrder}
                    handleDeleteOrder={handleDeleteOrder}
                />

                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-2 text-xs border ${
                                currentPage === i + 1
                                    ? "bg-[#0B1C2D] text-white"
                                    : "border-[#0B1C2D]/20 text-[#0B1C2D]"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

            </main>

            {/* Modal Détails Commande */}
            <OrderDetailsModal
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
                refresh={refreshOrders}
            />
        </div>
    );
};

export default AdminCommandesPage;