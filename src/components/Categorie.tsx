"use client";

import { useEffect, useState } from "react";
import { DM_Sans } from "next/font/google";
import ProductCard from "@/components/Card";
import { getProducts, Product } from "@/lib/product";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

export default function Categories() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();

                const normalized: Product[] = (data || []).map((p) => {
                    return {
                        id: p.id,
                        name: p.name,
                        price: p.price ?? 0,
                        image: p.image ?? null,
                        categorie: p.categorie ?? "",
                        rating: p.rating ?? 0,
                        quantity: p.quantity ?? 0,
                        sizes: Array.isArray(p.sizes)
                            ? p.sizes
                            : typeof p.sizes === "string"
                                ? p.sizes.split(",")
                                : [],
                    };
                });

                setProducts(normalized);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
            </div>

            {/* Loading */}
            {loading ? (
                <p className="text-center text-gray-400">Loading...</p>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}