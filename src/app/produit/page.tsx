"use client";

import {useEffect, useState} from "react";
import { getProducts, Product } from "@/lib/product";
import { DM_Sans } from "next/font/google";
import ProductCard from "@/components/Card";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const categories = ["Tout", "Vestes", "Overshirts", "Sweats", "Pantalons", "T-Shirts", "Accessoires"];



export default function ProduitPage() {
    const [activeCategory, setActiveCategory] = useState("Tout");

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();

            const normalized: Product[] = (data || []).map((p) => {
                let sizes: string[] = [];

                if (Array.isArray(p.sizes)) {
                    sizes = p.sizes;
                } else if (typeof p.sizes === "string") {
                    try {
                        const parsed = JSON.parse(p.sizes);

                        sizes = Array.isArray(parsed)
                            ? parsed
                            : p.sizes.split(",");
                    } catch {
                        sizes = p.sizes.split(",");
                    }
                }

                return {
                    id: p.id,
                    name: p.name,
                    price: p.price ?? 0,
                    image: p.image || p.image_url || "",
                    category: p.categorie ?? "",
                    categorie: p.categorie ?? "",
                    rating: p.rating ?? 0,
                    reviews: p.reviews ?? 0,
                    sizes,
                    quantity: p.quantity ?? 0,
                };
            });

            setProducts(normalized);
        };

        fetchProducts();
    }, []);

    const filtered = activeCategory === "Tout"
        ? products
        : products.filter((p) => p.categorie === activeCategory);

    return (
        <div className={`${dmSans.className} bg-[#F5F3EE] min-h-screen`}>
            <Navbar />
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-8">
                <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-3">
                    La collection
                </p>
                <h1 className="text-[#0B1C2D] text-5xl md:text-6xl font-light">
                    Nos Produits
                </h1>
            </div>

            <div className="border-b border-[#0B1C2D]/10" />

            {/* Mobile filters */}
            <div className="md:hidden sticky top-20 z-40 bg-[#F5F3EE] border-b border-[#0B1C2D]/10 px-6 py-3">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`whitespace-nowrap px-4 cursor-pointer py-2 text-xs tracking-widest uppercase transition-all duration-300 border ${
                                activeCategory === cat
                                    ? "bg-[#0B1C2D] text-white border-[#0B1C2D]"
                                    : "bg-transparent text-[#0B1C2D] border-[#0B1C2D]/20 hover:border-[#C6A75E] hover:text-[#C6A75E]"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            {/* Layout */}
            <div className="max-w-7xl mx-auto px-6 py-12 flex gap-12">

                {/* Sidebar */}
                <aside className="hidden md:flex flex-col gap-1 w-48 shrink-0 sticky top-28 self-start">
                    <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-4">
                        Catégories
                    </p>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-left px-0 py-2 cursor-pointer text-sm tracking-wide border-b border-transparent transition-all duration-200 ${
                                activeCategory === cat
                                    ? "text-[#C6A75E] border-b-[#C6A75E]"
                                    : "text-[#0B1C2D]/50 hover:text-[#0B1C2D]"
                            }`}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <span className="ml-2 text-[#C6A75E]">—</span>
                            )}
                        </button>
                    ))}

                    <div className="mt-8 border-t border-[#0B1C2D]/10 pt-6">
                        <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-4">
                            Résultats
                        </p>
                        <p className="text-[#0B1C2D] text-sm">
                            {filtered.length} produit{filtered.length > 1 ? "s" : ""}
                        </p>
                    </div>
                </aside>

                {/* Grid */}
                <div className="flex-1">
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <p className="text-gray-400 text-lg font-light">
                                Aucun produit dans cette catégorie.
                            </p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}