"use client";

import Link from "next/link";
import { DM_Sans } from "next/font/google";
import ProductCard from "@/components/Card";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const products = [
    {
        id: "1",
        name: "Technical Jacket",
        price: 12900,
        image: "/image/Technical Jacket.png",
        category: "Jackets",
        rating: 4.8,
        reviews: 124,
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: "2",
        name: "Slim Cargo",
        price: 8900,
        image: "/image/Slim Cargo Pants.png",
        category: "Pants",
        rating: 4.6,
        reviews: 89,
        sizes: ["S", "M", "L"],
    },
    {
        id: "3",
        name: "Korsar Cap",
        price: 3900,
        image: "/image/Technical Cap.png",
        category: "Accessories",
        rating: 4.9,
        reviews: 210,
        sizes: ["One Size"],
    },
];

export default function Categories() {
    return (
        <section className={`${dmSans.className} bg-[#F5F3EE] py-24 px-6`}>
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-2">
                        Explore
                    </p>
                    <h2 className="text-[#0B1C2D] text-4xl md:text-5xl font-light">
                        Our Collections
                    </h2>
                </div>
                <Link
                    href="/produit"
                    className="text-sm tracking-widest uppercase text-gray-400 hover:text-[#C6A75E] transition border-b border-gray-600 hover:border-[#C6A75E] pb-1 self-start md:self-auto"
                >
                    View All
                </Link>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}