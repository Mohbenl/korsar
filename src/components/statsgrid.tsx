import Link from "next/link";
import {CheckCircle, Package, ShoppingCart, TrendingUp} from "lucide-react";
import React, {useEffect, useState} from "react";
import { getProductsCount } from "@/lib/product";
import { getOrdersCount,getOrders } from "@/lib/commande";




interface Order {
    id: string;
    total: number;
    statut: string;
}

export default  function StatCard () {
    const [productsCount, setProductsCount] = useState(0);
    const [ordersCount, setOrdersCount] = useState(0);
    const [orders, setOrders] = useState<Order[]>([]);
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const completedOrders = orders.filter(
        (o) => o.statut === "Livrée"
    ).length;

    useEffect(() => {

        async function loadProductsCount() {
            try {
                const count = await getProductsCount();
                setProductsCount(count);
            } catch (error) {
                console.log(error);
            }
        }

        loadProductsCount();

        async function loadOrdersCount() {
            try {
                const count = await getOrdersCount();
                setOrdersCount(count);
            } catch (error) {
                console.log(error);
            }
        }

        loadOrdersCount();

        async function loadOrders() {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.log(error);
            }
        }

        loadOrders();

    }, []);
    return (
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
                            {productsCount}
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
                            {ordersCount}
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
    );


};