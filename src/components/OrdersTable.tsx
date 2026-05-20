"use client";


import React, { useEffect, useState } from "react";



import {
    Trash2,
    Clock,
    Truck,
    CheckCircle,
    RotateCcw,
    XCircle,
} from "lucide-react";

import {
    getOrders,
    deleteOrder,
    type Order,
} from "@/lib/commande";

interface Props {
    currentOrders: Order[];
    setSelectedOrder: (order: Order) => void;
    handleDeleteOrder: (id: string) => void;
}

export default function OrdersTable({
                                        currentOrders,
                                        setSelectedOrder,
                                        handleDeleteOrder,
                                    }: Props) {

    const [loading, setLoading] = useState(false);

    const getStatus = (status: string) => {
        switch (status) {
            case "En Attente":
                return (
                    <span className="flex items-center gap-1 text-yellow-600">
                        <Clock size={14} /> En Attente
                    </span>
                );

            case "Confirmer":
                return (
                    <span className="flex items-center gap-1 text-blue-600">
                        <Truck size={14} /> Confirmée
                    </span>
                );

            case "Livrer":
                return (
                    <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={14} /> Livrée
                    </span>
                );

            case "Annuler":
                return (
                    <span className="flex items-center gap-1 text-red-600">
                        <XCircle size={14} /> Annulée
                    </span>
                );

            case "Retour":
                return (
                    <span className="flex items-center gap-1 text-orange-600">
                        <RotateCcw size={14} /> Retour
                    </span>
                );

            default:
                return status;
        }
    };


    if (loading) {
        return <div className="p-6 text-center text-gray-500">Chargement...</div>;
    }

    if (!currentOrders.length) {
        return (
            <div className="p-12 text-center text-gray-400">
                Aucune commande
            </div>
        );
    }
    return (
        <div className="bg-white border border-[#0B1C2D]/10 overflow-x-auto">
            <table className="w-full">

                <thead className="border-b border-[#0B1C2D]/10 bg-[#F5F3EE]">
                <tr>
                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                        ID
                    </th>

                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                        Nom
                    </th>

                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                        Prénom
                    </th>

                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                        Wilaya
                    </th>

                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                        Total
                    </th>

                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                        Statut
                    </th>

                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                        Actions
                    </th>
                </tr>
                </thead>

                <tbody>
                {currentOrders.map((order) => (
                    <tr
                        key={order.id}
                        className="border-b hover:bg-gray-50"
                    >
                        <td className="px-6 py-4 text-sm">
                            <button
                                onClick={() => setSelectedOrder(order)}
                                className="text-[#0B1C2D] cursor-pointer hover:text-[#C6A75E]"
                            >
                                #{order.id?.slice(0, 6)}
                            </button>
                        </td>

                        <td className="px-6 py-4 text-sm text-[#0B1C2D] font-light">
                            {order.nom}
                        </td>

                        <td className="px-6 py-4 text-sm text-[#0B1C2D] font-light">
                            {order.prenom}
                        </td>

                        <td className="px-6 py-4 text-sm text-[#0B1C2D]/60">
                            {order.wilaya}
                        </td>

                        <td className="px-6 py-4 text-sm text-[#0B1C2D] font-light">
                            {order.total.toLocaleString()} DA
                        </td>

                        <td className="px-6 py-4 text-sm">
                            {getStatus(order.statut)}
                        </td>

                        <td className="px-6 py-4 text-sm">
                            <button
                                onClick={() => handleDeleteOrder(order.id!)}
                                className="flex items-center gap-1 px-3 py-2 border border-[#0B1C2D]/20 text-red-400 hover:border-red-400 transition-all duration-300 text-xs tracking-widest uppercase"
                            >
                                <Trash2 size={12} />
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
}