"use client";

import React, { useState, useEffect } from "react";
import AnalyticsPanel from "@/components/AnalyticsPanel";
import { useRouter } from "next/navigation";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { LogOut} from "lucide-react";
import {supabase} from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import StatCard from "@/components/statsgrid";
import Links from "@/components/links";

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
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [user, setUser] = useState<User | null>(null);




    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();

            console.log("USER SUPABASE :", data.user);

            if (!data.user) {
                router.replace("/admin/login"); // ✅ replace au lieu de push
                return;
            }

            setUser(data.user);
        };

        getUser();
    }, [router]);
    
    
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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };




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
                <StatCard />
                {/* Analytics Section */}
                <AnalyticsPanel orders={orders} />
                {/* Quick Links */}
                <Links />
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