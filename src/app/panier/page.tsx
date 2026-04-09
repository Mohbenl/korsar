"use client";

import Image from "next/image";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Footer from "@/components/footer";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

export default function PanierPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } = useCart();

    const total = getCartTotal();
    const count = getCartItemCount();

    return (
        <div className={`${dmSans.className} bg-[#F5F3EE] min-h-screen`}>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-8">
                <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-3">
                    Mon panier
                </p>
                <h1 className="text-[#0B1C2D] text-5xl md:text-6xl font-light">
                    Panier{" "}
                    {count > 0 && (
                        <span className="text-[#C6A75E] text-3xl">({count})</span>
                    )}
                </h1>
            </div>

            <div className="border-b border-[#0B1C2D]/10" />

            {cart.length === 0 ? (
                <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center gap-6 text-center">
                    <ShoppingBag size={48} className="text-[#0B1C2D]/20" />
                    <p className="text-[#0B1C2D] text-2xl font-light">
                        Votre panier est vide.
                    </p>
                    <p className="text-gray-400 font-light">
                        Découvrez nos collections et trouvez votre prochaine pièce.
                    </p>
                    <Link
                        href="/produit"
                        className="bg-[#0B1C2D] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#C6A75E] transition-all duration-300"
                    >
                        Voir les produits
                    </Link>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Items */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        <div className="flex justify-end">
                            <button
                                onClick={clearCart}
                                className="text-xs tracking-widest uppercase text-gray-400 hover:text-red-400 transition-colors duration-200"
                            >
                                Vider le panier
                            </button>
                        </div>

                        {cart.map((item) => (
                            <div
                                key={`${item.id}-${item.size}`}
                                className="bg-white flex gap-6 p-4 border border-[#0B1C2D]/10"
                            >
                                {/* Image */}
                                <div className="relative w-24 h-32 shrink-0 overflow-hidden bg-gray-50">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                            <ShoppingBag size={24} className="text-gray-300" />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-xs tracking-widest uppercase text-[#C6A75E]">
                                                {item.category}
                                            </p>
                                            <h3 className="text-[#0B1C2D] font-light text-lg">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm">
                                                Taille : {item.size}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="text-gray-300 hover:text-red-400 transition-colors duration-200 shrink-0"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        {/* Quantity */}
                                        <div className="flex items-center border border-[#0B1C2D]/20">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-[#0B1C2D] hover:text-[#C6A75E] transition-colors duration-200"
                                            >
                                                −
                                            </button>
                                            <span className="w-8 h-8 flex items-center justify-center text-[#0B1C2D] text-sm border-x border-[#0B1C2D]/20">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-[#0B1C2D] hover:text-[#C6A75E] transition-colors duration-200"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Price */}
                                        <p className="text-[#0B1C2D] font-light">
                                            {(item.price * item.quantity).toLocaleString()} DA
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-[#0B1C2D]/10 p-8 sticky top-28">
                            <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-6">
                                Récapitulatif
                            </p>

                            <div className="flex flex-col gap-4 border-b border-[#0B1C2D]/10 pb-6 mb-6">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-light">
                                            {item.name} x{item.quantity}
                                        </span>
                                        <span className="text-[#0B1C2D]">
                                            {(item.price * item.quantity).toLocaleString()} DA
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <p className="text-[#0B1C2D] text-sm tracking-widest uppercase">
                                    Total
                                </p>
                                <p className="text-[#0B1C2D] text-2xl font-light">
                                    {total.toLocaleString()} DA
                                </p>
                            </div>

                            <Link
                                href="/commander"
                                className="block text-center bg-[#0B1C2D] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#C6A75E] transition-all duration-300 mb-4"
                            >
                                Commander
                            </Link>

                            <Link
                                href="/produit"
                                className="block text-center border border-[#0B1C2D]/20 text-[#0B1C2D] px-8 py-4 text-sm tracking-widest uppercase hover:border-[#C6A75E] hover:text-[#C6A75E] transition-all duration-300"
                            >
                                Continuer mes achats
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}