"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/contexts/AdminContext";
import { Search } from "lucide-react";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { LogOut, Plus, Edit2, Trash2, ArrowLeft, Star } from "lucide-react";

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
    image?: string;
    rating: number;
    reviews: number;
    sizes: string[];
    description?: string;
    details?: string[];
}

const AdminProduitsPage = () => {
    const { isAuthenticated, logout } = useAdmin();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        price: 0,
        category: "Vestes",
        rating: 4.5,
        reviews: 0,
        sizes: ["S", "M", "L", "XL"],
    });
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [sortOrder, setSortOrder] = useState("default");

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/admin");
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(t);
    }, [debouncedSearch, selectedCategory, sortOrder]);

    useEffect(() => {
        try {
            const savedProducts = localStorage.getItem("korsar-products");
            if (savedProducts) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setProducts(JSON.parse(savedProducts));
            } else {
                const demoProducts: Product[] = [
                    {
                        id: "1",
                        name: "Technical Jacket",
                        price: 12900,
                        category: "Vestes",
                        rating: 4.8,
                        reviews: 124,
                        sizes: ["S", "M", "L", "XL"],
                    },
                    {
                        id: "2",
                        name: "Maritime Overshirt",
                        price: 8900,
                        category: "Overshirts",
                        rating: 4.6,
                        reviews: 89,
                        sizes: ["S", "M", "L"],
                    },
                ];
                setProducts(demoProducts);
                localStorage.setItem("korsar-products", JSON.stringify(demoProducts));
            }
        } catch (error) {
            console.error("Failed to load products:", error);
        }
    }, []);

    const handleAddProduct = () => {
        if (!formData.name || !formData.price) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        const newProduct: Product = {
            id: editingId || Date.now().toString(),
            name: formData.name || "",
            price: formData.price || 0,
            category: formData.category || "Vestes",
            rating: formData.rating || 4.5,
            reviews: formData.reviews || 0,
            sizes: formData.sizes || ["S", "M", "L"],
        };

        let updatedProducts;
        if (editingId) {
            updatedProducts = products.map((p) => (p.id === editingId ? newProduct : p));
            setEditingId(null);
        } else {
            updatedProducts = [...products, newProduct];
        }

        setProducts(updatedProducts);
        localStorage.setItem("korsar-products", JSON.stringify(updatedProducts));
        setFormData({
            name: "",
            price: 0,
            category: "Vestes",
            rating: 4.5,
            reviews: 0,
            sizes: ["S", "M", "L", "XL"],
        });
        setShowAddProduct(false);
    };

    const handleEditProduct = (product: Product) => {
        setFormData(product);
        setEditingId(product.id);
        setShowAddProduct(true);
    };

    const handleDeleteProduct = (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            const updatedProducts = products.filter((p) => p.id !== id);
            setProducts(updatedProducts);
            localStorage.setItem("korsar-products", JSON.stringify(updatedProducts));
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/admin");
    };

    if (!isAuthenticated) {
        return null;
    }

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = product.name
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase());

            const matchesCategory =
                selectedCategory === "Tous" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortOrder === "asc") return a.price - b.price;
            if (sortOrder === "desc") return b.price - a.price;
            return 0;
        });

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
                                Gestion des Produits
                            </h1>
                            <p className="text-xs tracking-widest uppercase text-[#C6A75E]">
                                {products.length} produit{products.length > 1 ? "s" : ""}
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
                            setShowAddProduct(!showAddProduct);
                            setEditingId(null);
                            setFormData({
                                name: "",
                                price: 0,
                                category: "Vestes",
                                rating: 4.5,
                                reviews: 0,
                                sizes: ["S", "M", "L", "XL"],
                            });
                        }}
                        className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-[#0B1C2D] text-white hover:bg-[#C6A75E] transition-all duration-300 text-sm tracking-widest uppercase"
                    >
                        <Plus size={16} />
                        {showAddProduct ? "Annuler" : "Ajouter produit"}
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showAddProduct && (
                    <div className="bg-white border border-[#0B1C2D]/10 p-8 mb-12">
                        <h3 className="text-lg font-light text-[#0B1C2D] mb-6">
                            {editingId ? "Modifier le produit" : "Ajouter un produit"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Nom du produit
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Technical Jacket"
                                    value={formData.name || ""}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D] placeholder-[#0B1C2D]/30"
                                />
                            </div>
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Prix (DA)
                                </label>
                                <input
                                    type="number"
                                    placeholder="Ex: 12900"
                                    value={formData.price || 0}
                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D] placeholder-[#0B1C2D]/30"
                                />
                            </div>
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Catégorie
                                </label>
                                <select
                                    value={formData.category || "Vestes"}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D]"
                                >
                                    <option value="Vestes">Vestes</option>
                                    <option value="Overshirts">Overshirts</option>
                                    <option value="Sweats">Sweats</option>
                                    <option value="Pantalons">Pantalons</option>
                                    <option value="T-Shirts">T-Shirts</option>
                                    <option value="Accessoires">Accessoires</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    max="5"
                                    placeholder="Ex: 4.8"
                                    value={formData.rating || 0}
                                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D] placeholder-[#0B1C2D]/30"
                                />
                            </div>
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Nombre d&#39;avis
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Ex: 124"
                                    value={formData.reviews || 0}
                                    onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D] placeholder-[#0B1C2D]/30"
                                />
                            </div>
                            <div>
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                    Tailles disponibles
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: S,M,L,XL"
                                    value={formData.sizes?.join(",") || ""}
                                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value.split(",").map(s => s.trim()) })}
                                    className="w-full px-4 py-3 border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D] placeholder-[#0B1C2D]/30"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleAddProduct}
                            className="w-full px-6 py-3 cursor-pointer bg-[#0B1C2D] text-white hover:bg-[#C6A75E] transition-all duration-300 text-sm tracking-widest uppercase"
                        >
                            {editingId ? "Modifier" : "Ajouter"} Produit
                        </button>
                    </div>
                )}
                {/* Search & Filters */}
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

                    {/* CATEGORY (PILLS) */}
                    <div className="flex flex-wrap gap-2">
                        {["Tous","Vestes","Overshirts","Sweats","Pantalons","T-Shirts","Accessoires"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all duration-300 ${
                                    selectedCategory === cat
                                        ? "bg-[#0B1C2D] text-white border-[#0B1C2D]"
                                        : "border-[#0B1C2D]/20 text-[#0B1C2D] hover:border-[#C6A75E] hover:text-[#C6A75E]"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* SORT (TOGGLE STYLE) */}
                    <div className="flex gap-2">
                        {[
                            { label: "Défaut", value: "default" },
                            { label: "Prix ↑", value: "asc" },
                            { label: "Prix ↓", value: "desc" },
                        ].map((s) => (
                            <button
                                key={s.value}
                                onClick={() => setSortOrder(s.value)}
                                className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all duration-300 ${
                                    sortOrder === s.value
                                        ? "bg-[#C6A75E] text-white border-[#C6A75E]"
                                        : "border-[#0B1C2D]/20 text-[#0B1C2D] hover:border-[#C6A75E] hover:text-[#C6A75E]"
                                }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Products Table */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white border border-[#0B1C2D]/10 p-12 text-center">
                        <p className="text-gray-400 font-light">
                            Aucun produit pour le moment
                        </p>
                    </div>
                ) : (
                    <div className="bg-white border border-[#0B1C2D]/10 overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-[#0B1C2D]/10 bg-[#F5F3EE]">
                            <tr className="border-b border-[#0B1C2D]/10 hover:bg-[#F5F3EE] transition-all duration-300 opacity-0 animate-[fadeIn_0.4s_forwards]">
                                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                                    Nom
                                </th>
                                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                                    Catégorie
                                </th>
                                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                                    Prix (DA)
                                </th>
                                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                                    Rating
                                </th>
                                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                                    Avis
                                </th>
                                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                                    Tailles
                                </th>
                                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                                    Modifier
                                </th>
                                <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">
                                    Supprimer
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentProducts.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className={`border-b border-[#0B1C2D]/10 hover:bg-[#F5F3EE] transition-all duration-300 opacity-0 animate-[fadeIn_0.4s_forwards] ${
                                        index === products.length - 1 ? "border-b-0" : ""
                                    }`}
                                >
                                    <td className="px-6 py-4 text-sm text-[#0B1C2D] font-light">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                            <span className="text-xs tracking-widest uppercase text-[#C6A75E] bg-[#C6A75E]/10 px-2 py-1">
                                                {product.category}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#0B1C2D] font-light">
                                        {product.price.toLocaleString()} DA
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Star size={14} className="fill-[#C6A75E] text-[#C6A75E]" />
                                            <span className="text-[#0B1C2D] font-light">
                                                    {product.rating}
                                                </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#0B1C2D]/60 font-light">
                                        {product.reviews}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex flex-wrap gap-1">
                                            {product.sizes.slice(0, 3).map((size) => (
                                                <span
                                                    key={size}
                                                    className="text-xs border border-[#0B1C2D]/20 px-2 py-1 text-[#0B1C2D]"
                                                >
                                                        {size}
                                                    </span>
                                            ))}
                                            {product.sizes.length > 3 && (
                                                <span className="text-xs text-[#0B1C2D]/60 px-2 py-1">
                                                        +{product.sizes.length - 3}
                                                    </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="flex items-center cursor-pointer gap-1 px-3 py-2 border border-[#0B1C2D]/20 text-[#0B1C2D] hover:border-[#C6A75E] hover:text-[#C6A75E] transition-all duration-300 text-xs tracking-widest uppercase"
                                            >
                                                <Edit2 size={12} />
                                                Modifier
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="flex items-center cursor-pointer gap-1 px-3 py-2 border border-[#0B1C2D]/20 text-red-400 hover:border-red-400 transition-all duration-300 text-xs tracking-widest uppercase"
                                            >
                                                <Trash2 size={12} />
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 text-sm border transition-all ${
                                currentPage === page
                                    ? "bg-[#0B1C2D] text-white"
                                    : "border-[#0B1C2D]/20 text-[#0B1C2D] hover:border-[#C6A75E] hover:text-[#C6A75E]"
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminProduitsPage;