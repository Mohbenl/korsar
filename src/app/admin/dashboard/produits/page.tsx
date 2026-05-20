"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import {LogOut,Plus,ArrowLeft} from "lucide-react";

import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import ProductForm from "@/components/productform";
import {getProducts} from "@/lib/product";
import ProductsTable from "@/components/productstable";
import { Product } from "@/lib/product";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});


const AdminProduitsPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        price: 0,
        categorie: "Vestes",
        rating: 4.5,
        quantity: 0,
        sizes: ["S", "M", "L", "XL", "XXL"],
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
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();

            console.log("USER :", data.user);

            if (!data.user) {
                router.replace("/admin/login");
                return;
            }

            setUser(data.user);
        };

        getUser();
    }, [router]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        const init = async () => {
            const data = await getProducts();

            const normalized: Product[] = (data || []).map((p: Product) => {
                return {
                    id: p.id,
                    name: p.name,
                    price: p.price ?? 0,
                    categorie: p.categorie ?? "",
                    rating: p.rating ?? 0,
                    quantity: p.quantity ?? 0,
                    image_url: p.image ?? null,
                    sizes: Array.isArray(p.sizes) ? p.sizes : [],
                };
            });

            setProducts(normalized);
        };

        init();
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(t);
    }, [debouncedSearch, selectedCategory, sortOrder]);


    const handleDeleteProduct = async (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            const { deleteProduct } = await import("@/lib/product");
            await deleteProduct(id);

            setProducts((prev) => prev.filter((p) => p.id !== id));
        }
    };

    const handleEditProduct = (product: Product) => {
        const normalizedSizes: string[] = Array.isArray(product.sizes)
            ? product.sizes
            : [];

        setFormData({
            ...product,
            sizes: normalizedSizes,
        });

        setEditingId(product.id ?? null);
        setShowAddProduct(true);
    };


    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    if (!user) {
        return null;
    }




    const filteredProducts = products
        .filter((product) => {
            const matchesSearch = (product.name ?? "")
                .toLowerCase()
                .includes(debouncedSearch.toLowerCase());

            const matchesCategory =
                selectedCategory === "Tous" ||
                (product.categorie ?? "") === selectedCategory;

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

    const refreshProducts = async () => {
        const data = await getProducts();
        setProducts(data);
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
                                categorie: "Vestes",
                                rating: 4.5,
                                quantity: 0,
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
                <ProductForm
                    showAddProduct={showAddProduct}
                    editingId={editingId}
                    formData={formData}
                    setFormData={setFormData}
                    setShowAddProduct={setShowAddProduct}
                    onSuccess={refreshProducts}
                />
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
                <ProductsTable
                    products={filteredProducts}
                    currentProducts={currentProducts}
                    handleDeleteProduct={handleDeleteProduct}
                    handleEditProduct={handleEditProduct}
                />
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