"use client";

import { Edit2, Trash2, Star } from "lucide-react";
import type { Product } from "@/lib/product";

interface Props {
    products: Product[];
    currentProducts: Product[];
    handleDeleteProduct: (id: string) => void;
    handleEditProduct: (product: Product) => void;
}

function normalizeSizes(sizes: unknown): string[] {
    if (!sizes) return [];

    if (Array.isArray(sizes)) {
        return sizes.map(String);
    }

    if (typeof sizes === "string") {
        try {
            const parsed = JSON.parse(sizes);
            return Array.isArray(parsed)
                ? parsed.map(String)
                : String(sizes).split(",");
        } catch {
            return sizes.split(",");
        }
    }

    return [];
}

export default function ProductsTable({
                                          products,
                                          currentProducts,
                                          handleDeleteProduct,
                                          handleEditProduct,
                                      }: Props) {

    if (!products || products.length === 0) {
        return (
            <div className="bg-white border border-[#0B1C2D]/10 p-12 text-center">
                <p className="text-gray-400 font-light">
                    Aucun produit pour le moment
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-[#0B1C2D]/10 overflow-x-auto">
            <table className="w-full">
                <thead className="border-b border-[#0B1C2D]/10 bg-[#F5F3EE]">
                <tr className="border-b border-[#0B1C2D]/10 hover:bg-[#F5F3EE] transition-all duration-300 opacity-0 animate-[fadeIn_0.4s_forwards]">
                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">Nom</th>
                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">Catégorie</th>
                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">Prix (DA)</th>
                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">Rating</th>
                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">Quantité</th>
                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">Tailles</th>
                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">Modifier</th>
                    <th className="px-6 py-4 text-left text-xs tracking-widest uppercase text-[#C6A75E] font-light">Supprimer</th>
                </tr>
                </thead>

                <tbody>
                {currentProducts.map((product, index) => {
                    const sizesArray = normalizeSizes(product.sizes);

                    return (
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
                                        {product.categorie}
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
                                {product.quantity}
                            </td>

                            <td className="px-6 py-4 text-sm">
                                <div className="flex flex-wrap gap-1">
                                    {sizesArray.slice(0, 3).map((size, i) => (
                                        <span
                                            key={`${size}-${i}`}
                                            className="text-xs border border-[#0B1C2D]/20 px-2 py-1 text-[#0B1C2D]"
                                        >
                                                {size}
                                            </span>
                                    ))}

                                    {sizesArray.length > 3 && (
                                        <span className="text-xs text-[#0B1C2D]/60 px-2 py-1">
                                                +{sizesArray.length - 3}
                                            </span>
                                    )}
                                </div>
                            </td>

                            <td className="px-6 py-4 text-sm">
                                <button
                                    onClick={() => handleEditProduct(product)}
                                    className="flex items-center cursor-pointer gap-1 px-3 py-2 border border-[#0B1C2D]/20 text-[#0B1C2D] hover:border-[#C6A75E] hover:text-[#C6A75E] transition-all duration-300 text-xs tracking-widest uppercase"
                                >
                                    <Edit2 size={12} />
                                    Modifier
                                </button>
                            </td>

                            <td className="px-6 py-4 text-sm">
                                <button
                                    disabled={!product.id}
                                    onClick={() => {
                                        if (!product.id) return;
                                        handleDeleteProduct(product.id);
                                    }}
                                    className="flex items-center cursor-pointer gap-1 px-3 py-2 border border-[#0B1C2D]/20 text-red-400 hover:border-red-400 transition-all duration-300 text-xs tracking-widest uppercase disabled:opacity-50"
                                >
                                    <Trash2 size={12} />
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}