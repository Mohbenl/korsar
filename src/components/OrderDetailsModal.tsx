"use client";

import React, { useEffect, useState } from "react";
import {
    updateOrderStatus,
    type Order,
    type OrderStatus,
    getOrderItems,
} from "@/lib/commande";

import {
    X,
    Clock,
    Truck,
    CheckCircle,
    RotateCcw,
    XCircle,
} from "lucide-react";

interface OrderItem {
    product_name: string;
    product_image: string;
    quantite: number;
    taille: string;
    prix: number;
}

interface Props {
    selectedOrder: Order | null;
    setSelectedOrder: (order: Order | null) => void;
    refresh: () => void;
}

const STATUS_CONFIG: Record<
    OrderStatus,
    {
        label: string;
        Icon: React.ElementType;
        colors: { bg: string; text: string; border: string; hoverBg: string };
    }
> = {
    "En Attente": {
        label: "En attente",
        Icon: Clock,
        colors: { bg: "#fffbeb", text: "#b45309", border: "#fde68a", hoverBg: "#fef3c7" },
    },
    Confirmer: {
        label: "Confirmer",
        Icon: Truck,
        colors: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe", hoverBg: "#dbeafe" },
    },
    Livrer: {
        label: "Livré",
        Icon: CheckCircle,
        colors: { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0", hoverBg: "#dcfce7" },
    },
    Annuler: {
        label: "Annuler",
        Icon: XCircle,
        colors: { bg: "#fff1f2", text: "#be123c", border: "#fecdd3", hoverBg: "#ffe4e6" },
    },
    Retour: {
        label: "Retour",
        Icon: RotateCcw,
        colors: { bg: "#f9fafb", text: "#374151", border: "#e5e7eb", hoverBg: "#f3f4f6" },
    },
};

export default function OrderDetailsModal({
                                              selectedOrder,
                                              setSelectedOrder,
                                              refresh,
                                          }: Props) {

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        if (!selectedOrder?.id) return;

        let isMounted = true;

        const load = async () => {
            const data = await getOrderItems(selectedOrder.id!);
            if (isMounted) setItems(data || []);
        };

        load();

        return () => {
            isMounted = false;
        };
    }, [selectedOrder?.id]);

    const changeStatus = async (status: OrderStatus) => {
        try {
            setLoading(true);
            await updateOrderStatus(selectedOrder!.id!, status);
            await refresh();
        } finally {
            setLoading(false);
        }
    };

    const computedTotal = items.length
        ? items.reduce((sum, item) => {
            return sum + Number(item.prix) * Number(item.quantite);
        }, 0)
        : selectedOrder?.total || 0;

    if (!selectedOrder) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">

            {/* MODAL WRAPPER */}
            <div className="relative bg-white  w-full max-w-3xl  max-h-[90vh] rounded-2xl shadow-2xl border border-[#0B1C2D]/10 flex flex-col overflow-hidden">

                {/* HEADER (fix propre dans modal scroll) */}
                <div className="sticky top-0 z-20 bg-white border-b border-black/10 px-4 sm:px-6 py-4">
                    <button
                        onClick={() => setSelectedOrder(null)}
                        className="absolute right-4 cursor-pointer top-4 text-[#0B1C2D]/40 hover:text-red-400 transition"
                    >
                        <X />
                    </button>
                    <h2 className="text-lg sm:text-xl font-light text-[#0B1C2D]">
                        Détails de la commande
                    </h2>
                </div>

                {/* CONTENT SCROLL AREA */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

                    {/* CLIENT */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-4 bg-[#F5F3EE] rounded-xl">
                            <p className="text-xs text-[#C6A75E]">Client</p>
                            <p className="text-sm text-black font-medium">
                                {selectedOrder.nom ?? "-"} {selectedOrder.prenom ?? ""}
                            </p>
                        </div>

                        <div className="p-4 bg-[#F5F3EE] rounded-xl">
                            <p className="text-xs text-[#C6A75E]">Téléphone</p>
                            <p className="text-sm text-black font-medium">
                                {selectedOrder.telephone ?? "-"}
                            </p>
                        </div>

                        <div className="p-4 bg-[#F5F3EE] rounded-xl">
                            <p className="text-xs text-[#C6A75E]">Total</p>
                            <p className="text-sm font-semibold text-black">
                                {computedTotal.toFixed(2)} DA
                            </p>
                        </div>
                    </div>

                    {/* ADRESSE */}
                    <div className="p-4 bg-[#F5F3EE] rounded-xl">
                        <p className="text-xs text-[#C6A75E]">Adresse</p>
                        <p className="text-sm text-black">
                            {selectedOrder.adresse ?? "-"} - {selectedOrder.wilaya ?? "-"}
                        </p>
                    </div>

                    {/* PRODUITS */}
                    <div className="space-y-3">
                        {items.length === 0 ? (
                            <p className="text-sm text-gray-400">Aucun produit</p>
                        ) : (
                            items.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-[#0B1C2D]/10 rounded-xl bg-white">
                                    {/* IMAGE FIX SIZE */}
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={item.product_image || "/placeholder.png"}
                                            alt={item.product_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-[#C6A75E] truncate">
                                            {item.product_name}
                                        </p>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Taille: {item.taille} • Qté: {item.quantite}
                                        </p>
                                    </div>

                                    <div className="text-[#C6A75E] font-semibold text-sm sm:text-base whitespace-nowrap">
                                        {(item.prix * item.quantite).toFixed(2)} DA
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* STATUS BUTTONS */}
                    <div className="flex flex-wrap gap-2 pt-2">
                        {(Object.entries(STATUS_CONFIG) as [OrderStatus, (typeof STATUS_CONFIG)[OrderStatus]][]).map(([status, config]) => {
                            const { Icon, colors } = config;

                            return (
                                <button
                                    key={status}
                                    onClick={() => changeStatus(status)}
                                    disabled={loading}
                                    style={{
                                        backgroundColor: colors.bg,
                                        color: colors.text,
                                        borderColor: colors.border,
                                    }}
                                    className="inline-flex items-center cursor-pointer gap-1.5 px-3 py-1.5 rounded-full border text-[12px] sm:text-[13px] font-medium disabled:opacity-40 whitespace-nowrap">
                                    <Icon size={14} />
                                    {config.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* CLOSE BUTTON */}
                    <button
                        onClick={() => setSelectedOrder(null)}
                        className="w-full bg-[#0B1C2D] text-white cursor-pointer py-3 rounded-xl hover:bg-[#C6A75E] transition mt-4">
                        {loading ? "Chargement..." : "Fermer"}
                    </button>

                </div>
            </div>
        </div>
    );
}