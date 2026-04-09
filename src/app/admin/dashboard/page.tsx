"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/contexts/AdminContext";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { LogOut, Package, ShoppingCart, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    rating: number;
    reviews: number;
    sizes: string[];
}

interface Order {
    id: string;
    email: string;
    items: number;
    total: number;
    date: string;
    status: "pending" | "completed" | "shipped";
}

const AdminDashboard = () => {
    const { isAuthenticated, logout } = useAdmin();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/admin");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        try {
            const savedProducts = localStorage.getItem("korsar-products");
            if (savedProducts) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setProducts(JSON.parse(savedProducts));
            }

            const savedOrders = localStorage.getItem("korsar-orders");
            if (savedOrders) {
                setOrders(JSON.parse(savedOrders));
            }
        } catch (error) {
            console.error("Failed to load data:", error);
        }
    }, []);

    const handleLogout = () => {
        logout();
        router.push("/admin");
    };

    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const completedOrders = orders.filter((o) => o.status === "completed").length;

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={`${dmSans.className} bg-[#F5F3EE] min-h-screen`}>
            {/* Header */}
            <header className="bg-white border-b border-[#0B1C2D]/10 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-light text-[#0B1C2D]">
                            Korsar<span className="text-[#C6A75E]">.</span> Admin
                        </h1>
                        <p className="text-xs tracking-widest uppercase text-[#C6A75E]">
                            Tableau de bord
                        </p>
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
                <div className="mb-12">
                    <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                        Vue d&#39;ensemble
                    </p>
                    <h2 className="text-3xl font-light text-[#0B1C2D]">
                        Bienvenue
                    </h2>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Produits */}
                    <Link
                        href="/admin/dashboard/produits"
                        className="bg-white border border-[#0B1C2D]/10 p-8 hover:border-[#C6A75E]/30 transition-all duration-300 group cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                    Produits
                                </p>
                                <p className="text-4xl font-light text-[#0B1C2D]">
                                    {products.length}
                                </p>
                            </div>
                            <Package className="text-[#C6A75E]/30 group-hover:text-[#C6A75E]/50 transition-all" size={32} />
                        </div>
                        <p className="text-xs text-gray-400">
                            Total en catalogue
                        </p>
                    </Link>

                    {/* Commandes */}
                    <Link
                        href="/admin/dashboard/commandes"
                        className="bg-white border border-[#0B1C2D]/10 p-8 hover:border-[#C6A75E]/30 transition-all duration-300 group cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                    Commandes
                                </p>
                                <p className="text-4xl font-light text-[#0B1C2D]">
                                    {orders.length}
                                </p>
                            </div>
                            <ShoppingCart className="text-[#C6A75E]/30 group-hover:text-[#C6A75E]/50 transition-all" size={32} />
                        </div>
                        <p className="text-xs text-gray-400">
                            Reçues
                        </p>
                    </Link>

                    {/* Revenu */}
                    <div className="bg-white border border-[#0B1C2D]/10 p-8 hover:border-[#C6A75E]/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                    Revenu total
                                </p>
                                <p className="text-4xl font-light text-[#0B1C2D]">
                                    {totalRevenue.toLocaleString()} DA
                                </p>
                            </div>
                            <TrendingUp className="text-[#C6A75E]/30" size={32} />
                        </div>
                        <p className="text-xs text-gray-400">
                            Chiffre d&#39;affaires
                        </p>
                    </div>

                    {/* Complétées */}
                    <div className="bg-white border border-[#0B1C2D]/10 p-8 hover:border-[#C6A75E]/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                    Complétées
                                </p>
                                <p className="text-4xl font-light text-[#0B1C2D]">
                                    {completedOrders}
                                </p>
                            </div>
                            <CheckCircle className="text-[#C6A75E]/30" size={32} />
                        </div>
                        <p className="text-xs text-gray-400">
                            Finalisées
                        </p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white border border-[#0B1C2D]/10 p-8">
                    <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-6">
                        Navigation rapide
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            href="/admin/dashboard/produits"
                            className="flex items-center justify-between p-4 border border-[#0B1C2D]/10 hover:border-[#C6A75E] hover:bg-[#F5F3EE] transition-all duration-300 group"
                        >
                            <span className="text-sm tracking-widest uppercase text-[#0B1C2D] font-light">
                                Gérer les produits
                            </span>
                            <ArrowRight size={16} className="text-[#C6A75E] group-hover:translate-x-1 transition-all" />
                        </Link>
                        <Link
                            href="/admin/dashboard/commandes"
                            className="flex items-center justify-between p-4 border border-[#0B1C2D]/10 hover:border-[#C6A75E] hover:bg-[#F5F3EE] transition-all duration-300 group"
                        >
                            <span className="text-sm tracking-widest uppercase text-[#0B1C2D] font-light">
                                Voir les commandes
                            </span>
                            <ArrowRight size={16} className="text-[#C6A75E] group-hover:translate-x-1 transition-all" />
                        </Link>
                    </div>
                </div>
            </main>
            <div className="text-center mt-8">
                <p className="text-xs text-[#0B1C2D]/50">
                    <Link href="/" className="hover:text-[#C6A75E] transition-colors">
                        ← Retour à l&#39;accueil
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;