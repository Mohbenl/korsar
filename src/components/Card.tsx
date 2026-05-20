"use client";

import { useState } from "react";
import {Product} from "@/lib/product";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";


interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link href={`/produit/${product.id}`}>
            <div
                className="group relative bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 hover:scale-[1.02]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
                    <Image
                        src={product.image || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Badge catégorie */}
                    <span className="absolute top-4 left-4 bg-[#0B1C2D] text-white text-xs px-3 py-1 rounded-full">
                        {product.categorie}
                    </span>

                    {/* Bouton quick add */}
                    <button
                        className={`absolute bottom-4 right-4 bg-[#C6A75E] text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-[#b8965c] ${
                            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // addToCart logic ici
                        }}
                        aria-label={`Ajouter ${product.name} au panier`}
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </button>
                </div>

                {/* Infos */}
                <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-[#C6A75E] text-[#C6A75E]" />
                        <span className="text-sm font-medium text-gray-500">{product.rating}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#0B1C2D] mb-2 group-hover:text-[#C6A75E] transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-xl font-bold text-[#C6A75E]">
                        {product.price} DA
                    </p>
                </div>
            </div>
        </Link>
    );
}