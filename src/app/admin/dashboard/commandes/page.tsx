"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/contexts/AdminContext";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import {LogOut, ShoppingCart, ArrowLeft, Plus, Trash2, X, CheckCircle, Truck, Clock, Search} from "lucide-react";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

type OrderStatus = "pending" | "completed" | "shipped";

interface OrderItem {
    name: string;
    size: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    nom: string;
    prenom: string;
    items: number;
    total: number;
    date: string;
    status: OrderStatus;

    // 👇 AJOUT ICI
    orderItems?: OrderItem[];
}

const AdminCommandesPage = () => {
    const { isAuthenticated, logout } = useAdmin();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [showAddOrder, setShowAddOrder] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Tous");

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 6;
    const [formData, setFormData] = useState<{
        nom: string;
        prenom: string;
        items: number;
        total: number;
        status: OrderStatus;
    }>({
        nom:"",
        prenom:"",
        items: 1,
        total: 0,
        status: "pending",
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/admin");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/immutability
        loadOrders();
    }, []);

    useEffect(() => {
        const t = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 300);
        return () => clearTimeout(t);
    }, [searchTerm]);
    const loadOrders = () => {
        try {
            const savedOrders = localStorage.getItem("korsar-orders");
            if (savedOrders) {
                setOrders(JSON.parse(savedOrders));
            } else {
                // Données de test par défaut
                const demoOrders: Order[] = [
                    {
                        id: "1701234567890",
                        nom: "ahmed",
                        prenom : "benali",
                        items: 2,
                        total: 21800,
                        date: "09/04/2026",
                        status: "completed",
                    },
                    {
                        id: "1701234567891",
                        nom : "fatima",
                        prenom : "djezzar",
                        items: 1,
                        total: 12900,
                        date: "08/04/2026",
                        status: "shipped",
                    },
                    {
                        id: "1701234567892",
                        nom : "karim",
                        prenom : "medel",
                        items: 3,
                        total: 28700,
                        date: "07/04/2026",
                        status: "completed",
                    },
                    {
                        id: "1701234567893",
                        nom: "leila",
                        prenom: "hamidani",
                        items: 1,
                        total: 6900,
                        date: "06/04/2026",
                        status: "pending",
                    },
                    {
                        id: "1701234567894",
                        nom: "mourad",
                        prenom: "bensalem",
                        items: 2,
                        total: 15800,
                        date: "05/04/2026",
                        status: "shipped",
                    },
                    {
                        id: "1701234567895",
                        nom: "amina",
                        prenom: "radjah",
                        items: 1,
                        total: 8900,
                        date: "04/04/2026",
                        status: "completed",
                    },
                    {
                        id: "1701234567896",
                        nom: "romain",
                        prenom: "dupont",
                        items: 4,
                        total: 35600,
                        date: "03/04/2026",
                        status: "pending",
                    },
                    {
                        id: "1701234567897",
                        nom: "nadia",
                        prenom: "koceir",
                        items: 2,
                        total: 19800,
                        date: "02/04/2026",
                        status: "completed",
                    },
                ];
                setOrders(demoOrders);
                localStorage.setItem("korsar-orders", JSON.stringify(demoOrders));
            }
        } catch (error) {
            console.error("Failed to load orders:", error);
        }
    };

    const saveOrdersToLocalStorage = (updatedOrders: Order[]) => {
        localStorage.setItem("korsar-orders", JSON.stringify(updatedOrders));
        setOrders(updatedOrders);
    };

    const handleAddOrder = () => {
        if (!formData.nom || !formData.prenom || !formData.total || formData.items <= 0) {
            alert("Veuillez remplir tous les champs correctement");
            return;
        }

        const now = new Date();
        const date = now.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const newOrder: Order = {
            id: Date.now().toString(),
            nom: formData.nom,
            prenom: formData.prenom,
            items: formData.items,
            total: formData.total,
            date: date,
            status: formData.status,
        };

        const updatedOrders = [...orders, newOrder];
        saveOrdersToLocalStorage(updatedOrders);

        // Reset form
        setFormData({
            nom: "",
            prenom: "",
            items: 1,
            total: 0,
            status: "pending",
        });
        setShowAddOrder(false);
    };

    const handleDeleteOrder = (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
            const updatedOrders = orders.filter((o) => o.id !== id);
            saveOrdersToLocalStorage(updatedOrders);
        }
    };

    const handleChangeStatus = (id: string, newStatus: "pending" | "completed" | "shipped") => {
        const updatedOrders = orders.map((o) =>
            o.id === id ? { ...o, status: newStatus } : o
        );
        saveOrdersToLocalStorage(updatedOrders);
        setSelectedOrder(updatedOrders.find((o) => o.id === id) || null);
    };

    const handleLogout = () => {
        logout();
        router.push("/admin");
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock size={16} className="text-yellow-600" />;
            case "shipped":
                return <Truck size={16} className="text-blue-600" />;
            case "completed":
                return <CheckCircle size={16} className="text-green-600" />;
            default:
                return null;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "pending":
                return "En attente";
            case "shipped":
                return "Expédiée";
            case "completed":
                return "Complétée";
            default:
                return status;
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    const filteredOrders = orders.filter((o) => {
        const matchSearch =
            o.nom.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            o.prenom.toLowerCase().includes(debouncedSearch.toLowerCase());

        const matchStatus =
            statusFilter === "Tous" || o.status === statusFilter;

        return matchSearch && matchStatus;
    });

    const indexOfLast = currentPage * ordersPerPage;
    const indexOfFirst = indexOfLast - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
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
                                {orders.length} commande{orders.length > 1 ? "s" : ""}
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
                {/* Add Button */}
                <div className="mb-8 flex justify-end">
                    <button
                        onClick={() => {
                            setShowAddOrder(!showAddOrder);
                            setFormData({
                                nom: "",
                                prenom: "",
                                items: 1,
                                total: 0,
                                status: "pending",
                            });
                        }}
                        className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-[#0B1C2D] text-white hover:bg-[#C6A75E] transition-all duration-300 text-sm tracking-widest uppercase"
                    >
                        <Plus size={16} />
                        {showAddOrder ? "Annuler" : "Ajouter commande"}
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showAddOrder && (
                    <div className="bg-white border border-[#0B1C2D]/10 p-8 mb-12">
                        <h3 className="text-lg font-light text-[#0B1C2D] mb-6">
                            Ajouter une nouvelle commande
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Nom du client
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    value={formData.nom}
                                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D] placeholder-[#0B1C2D]/30"
                                />
                            </div>
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Prénom du client
                                </label>
                                <input
                                    type="text"
                                    placeholder="Prénom"
                                    value={formData.prenom}
                                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D] placeholder-[#0B1C2D]/30"
                                />
                            </div>
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Nombre d&#39;articles
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Ex: 2"
                                    value={formData.items}
                                    onChange={(e) => setFormData({ ...formData, items: parseInt(e.target.value) || 1 })}
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D] placeholder-[#0B1C2D]/30"
                                />
                            </div>
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Total (DA)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Ex: 25800"
                                    value={formData.total}
                                    onChange={(e) => setFormData({ ...formData, total: parseFloat(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D] placeholder-[#0B1C2D]/30"
                                />
                            </div>
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Statut
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            status: e.target.value as OrderStatus,
                                        })
                                    }
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D]"
                                >
                                    <option value="pending">⏳ En attente</option>
                                    <option value="shipped">→ Expédiée</option>
                                    <option value="completed">✓ Complétée</option>
                                </select>
                            </div>
                        </div>
                        <button
                            onClick={handleAddOrder}
                            className="w-full px-6 py-3 cursor-pointer bg-[#0B1C2D] text-white hover:bg-[#C6A75E] transition-all duration-300 text-sm tracking-widest uppercase"
                        >
                            Ajouter Commande
                        </button>
                    </div>
                )}

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
                        {["Tous", "pending", "shipped", "completed"].map((s) => (
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
                                {s === "pending"
                                    ? "En attente"
                                    : s === "shipped"
                                        ? "Expédiée"
                                        : s === "completed"
                                            ? "Complétée"
                                            : "Tous"}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Orders Table */}
                {orders.length === 0 ? (
                    <div className="bg-white border border-[#0B1C2D]/10 p-12 text-center">
                        <ShoppingCart size={32} className="text-[#0B1C2D]/20 mx-auto mb-4" />
                        <p className="text-gray-400 font-light">
                            Aucune commande pour le moment
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-[#0B1C2D]/10 overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-[#0B1C2D]/10 bg-[#F5F3EE]">
                            <tr className="border-b border-[#0B1C2D]/10 hover:bg-[#F5F3EE] transition-all duration-300">
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
                                    Articles
                                </th>
                                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                                    Total
                                </th>
                                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                                    Date
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
                            {currentOrders.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className={`border-b border-[#0B1C2D]/10 hover:bg-[#F5F3EE] transition-all duration-300 ${
                                        index === orders.length - 1 ? "border-b-0" : ""
                                    }`}
                                >
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="text-[#0B1C2D] hover:text-[#C6A75E] font-light cursor-pointer transition-colors"
                                        >
                                            #{order.id.slice(0, 8)}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#0B1C2D] font-light">
                                        {order.nom}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#0B1C2D] font-light">
                                        {order.prenom}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#0B1C2D] font-light">
                                        {order.items}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#0B1C2D] font-light">
                                        {order.total.toLocaleString()} DA
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#0B1C2D] font-light">
                                        {order.date}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(order.status)}
                                            <span className="text-[#0B1C2D] font-light">
                                                    {getStatusLabel(order.status)}
                                                </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => handleDeleteOrder(order.id)}
                                            className="flex items-center cursor-pointer gap-1 px-3 py-2 border border-[#0B1C2D]/20 text-red-400 hover:border-red-400 transition-all duration-300 text-xs tracking-widest uppercase"
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
                )}

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
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-8 animate-in fade-in max-h-[85vh] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-light text-[#0B1C2D]">
                                Détails Commande
                            </h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-[#0B1C2D]/50 cursor-pointer hover:text-[#0B1C2D] transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Details */}
                        <div className="space-y-6 overflow-y-auto pr-2">
                            {/* ID */}
                            <div>
                                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                    Numéro de commande
                                </p>
                                <p className="text-[#0B1C2D] font-light">
                                    #{selectedOrder.id.slice(0, 12)}
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                    Information du client
                                </p>
                                <p className="text-[#0B1C2D] font-light break-all">
                                    {selectedOrder.nom}
                                </p>
                                <p className="text-[#0B1C2D] font-light break-all">
                                    {selectedOrder.prenom}
                                </p>
                            </div>

                            {/* Articles */}
                            <div>
                                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                    Nombre d&#39;articles
                                </p>
                                <p className="text-[#0B1C2D] font-light">
                                    {selectedOrder.items} article{selectedOrder.items > 1 ? "s" : ""}
                                </p>
                            </div>

                            {/* ARTICLES DÉTAILLÉS */}
                            {selectedOrder.orderItems && (
                                <div>
                                    <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                        Articles
                                    </p>

                                    <div className="space-y-2">
                                        {selectedOrder.orderItems.map((item: OrderItem, i: number) => (
                                            <div
                                                key={i}
                                                className="flex justify-between border border-[#0B1C2D]/10 p-2"
                                            >
                                                <div>
                                                    <p className="text-[#0B1C2D] font-light">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-[#0B1C2D]/50">
                                                        {item.size} • x{item.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-[#0B1C2D] font-light">
                                                    {(item.price * item.quantity).toLocaleString()} DA
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Total */}
                            <div>
                                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                    Montant total
                                </p>
                                <p className="text-2xl font-light text-[#0B1C2D]">
                                    {selectedOrder.total.toLocaleString()} DA
                                </p>
                            </div>

                            {/* Date */}
                            <div>
                                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                    Date
                                </p>
                                <p className="text-[#0B1C2D] font-light">
                                    {selectedOrder.date}
                                </p>
                            </div>

                            {/* Status avec buttons */}
                            <div className="border-t border-[#0B1C2D]/10 pt-6">
                                <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-3">
                                    Statut
                                </p>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => handleChangeStatus(selectedOrder.id, "pending")}
                                        className={`py-2 px-4 text-sm cursor-pointer tracking-widest uppercase transition-all duration-300 flex items-center gap-2 justify-center ${
                                            selectedOrder.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-400"
                                                : "bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100"
                                        }`}
                                    >
                                        <Clock size={14} />
                                        En attente
                                    </button>
                                    <button
                                        onClick={() => handleChangeStatus(selectedOrder.id, "shipped")}
                                        className={`py-2 px-4 text-sm cursor-pointer tracking-widest uppercase transition-all duration-300 flex items-center gap-2 justify-center ${
                                            selectedOrder.status === "shipped"
                                                ? "bg-blue-100 text-blue-700 border-2 border-blue-400"
                                                : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                                        }`}
                                    >
                                        <Truck size={14} />
                                        Expédiée
                                    </button>
                                    <button
                                        onClick={() => handleChangeStatus(selectedOrder.id, "completed")}
                                        className={`py-2 px-4 text-sm cursor-pointer tracking-widest uppercase transition-all duration-300 flex items-center gap-2 justify-center ${
                                            selectedOrder.status === "completed"
                                                ? "bg-green-100 text-green-700 border-2 border-green-400"
                                                : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                                        }`}
                                    >
                                        <CheckCircle size={14} />
                                        Complétée
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="w-full mt-6 py-3 cursor-pointer bg-[#0B1C2D] text-white hover:bg-[#C6A75E] transition-all duration-300 text-sm tracking-widest uppercase"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCommandesPage;