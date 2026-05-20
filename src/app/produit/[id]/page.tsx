"use client";

import { useState,useEffect } from "react";
import { useParams } from "next/navigation";
import { getProductById, Product,getProducts } from "@/lib/product";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { ShoppingBag, ArrowLeft, Star, Truck, RefreshCw, Shield } from "lucide-react";
import ProductCard from "@/components/Card";
import Footer from "@/components/footer";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});




const guarantees = [
    { icon: Truck, label: "Livraison 48h", desc: "Partout en Algérie" },
    { icon: RefreshCw, label: "Retours 30j", desc: "Satisfait ou remboursé" },
    { icon: Shield, label: "Paiement sécurisé", desc: "100% sécurisé" },
];
export default function ProductDetailPage() {

    const params = useParams();
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const { addToCart } = useCart();
    const router = useRouter();


    useEffect(() => {
        async function fetchProduct() {
            try {
                const data = await getProductById(id);

                setProduct({
                    ...data,
                    details: data.details || [
                        "Produit premium",
                        "Édition limitée",
                        "Qualité Korsar",
                    ],
                });

                const allProducts = await getProducts();

                const filteredProducts = allProducts
                    .filter((p) => p.id !== data.id)
                    .slice(0, 3);

                setSimilarProducts(filteredProducts);
            } catch (error) {
                console.log(error);
            }
        }

        if (id) {
            fetchProduct();
        }
    }, [id]);


    const handleAddToCart = () => {
        if (!product) return;

        addToCart(
            {
                ...product,
                categorie: product.categorie,
            },
            selectedSize || undefined,
            quantity
        );
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleOrder = () => {
        if (!selectedSize || !product) return;

        router.push(`/commander?id=${product.id}&size=${selectedSize}&quantity=${quantity}`);
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Chargement...
            </div>
        );
    }

    const productImages = Array.isArray(product.image)
        ? product.image
        : product.image
            ? [product.image]
            : ["/image/placeholder.png"];

    const productSizes = Array.isArray(product.sizes)
        ? product.sizes
        : [];


    return (
        <div className={`${dmSans.className} bg-[#F5F3EE] min-h-screen`}>
            <Navbar />
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-6">
                <Link
                    href="/produit"
                    className="flex items-center gap-2 text-gray-400 text-sm hover:text-[#C6A75E] transition-colors duration-200"
                >
                    <ArrowLeft size={14} />
                    Retour aux produits
                </Link>
            </div>

            {/* Product */}
            <div className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Images */}
                <div className="flex gap-4">

                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3">
                        {productImages.map((img: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`relative w-16 h-20 overflow-hidden border transition-all duration-200 ${
                                    activeImage === index
                                        ? "border-[#C6A75E]"
                                        : "border-[#0B1C2D]/10 hover:border-[#0B1C2D]/30"
                                }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${product.name} ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Main image */}
                    <div className="relative flex-1 aspect-[2/3] overflow-hidden bg-white">
                        <Image
                            src={productImages[activeImage]}
                            alt={product.name}
                            fill
                            className="object-contain"
                        />
                        {/* Limited badge */}
                        <div className="absolute top-4 left-4 bg-[#C6A75E] text-white text-xs px-3 py-1 tracking-widest uppercase">
                            Limité
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-8">

                    {/* Header */}
                    <div>
                        <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-2">
                            {product.categorie}
                        </p>
                        <h1 className="text-[#0B1C2D] text-4xl font-light mb-4">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={i < Math.floor(product.rating) ? "fill-[#C6A75E] text-[#C6A75E]" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-400">
                                {product.rating}
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <p className="text-[#0B1C2D] text-3xl font-light">
                        {product.price.toLocaleString()} DA
                    </p>

                    {/* Description */}
                    <p className="text-gray-500 font-light leading-relaxed">
                        {product.description || "Produit exclusif Korsar."}
                    </p>

                    {/* Size selector */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs tracking-widest uppercase text-[#0B1C2D]">
                                Taille
                            </p>
                            {!selectedSize && (
                                <p className="text-xs text-red-400">Sélectionnez une taille</p>
                            )}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {productSizes.map((size: string) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`w-12 h-12 text-sm border cursor-pointer transition-all duration-200 ${
                                        selectedSize === size
                                            ? "bg-[#0B1C2D] text-white border-[#0B1C2D]"
                                            : "bg-transparent text-[#0B1C2D] border-[#0B1C2D]/20 hover:border-[#C6A75E] hover:text-[#C6A75E]"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Quantité */}
                    <div>
                        <p className="text-xs tracking-widest uppercase text-[#0B1C2D] mb-3">
                            Quantité
                        </p>
                        <div className="flex items-center border border-[#0B1C2D]/20 w-fit">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="w-10 h-10 flex cursor-pointer items-center justify-center text-[#0B1C2D] hover:text-[#C6A75E] transition-colors duration-200 text-lg"
                            >
                                −
                            </button>
                            <span className="w-10 h-10 flex items-center justify-center text-[#0B1C2D] text-sm border-x border-[#0B1C2D]/20">
                                  {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="w-10 h-10 flex items-center cursor-pointer justify-center text-[#0B1C2D] hover:text-[#C6A75E] transition-colors duration-200 text-lg"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    {/* Add to cart */}
                    <button
                        onClick={handleAddToCart}
                        disabled={!selectedSize}
                        className={`flex items-center cursor-pointer justify-center gap-3 py-4 px-8 text-sm tracking-widest uppercase transition-all duration-300 ${
                            selectedSize
                                ? added
                                    ? "bg-[#C6A75E] text-white"
                                    : "bg-[#0B1C2D] text-white hover:bg-[#C6A75E]"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <ShoppingBag size={16} />
                        {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
                    </button>

                    {/* Bouton Commander */}
                    <button
                        onClick={handleOrder}
                        disabled={!selectedSize}
                        className={`flex items-center cursor-pointer justify-center gap-3 py-4 px-8 text-sm tracking-widest uppercase transition-all duration-300 border ${
                            selectedSize
                                ? "border-[#0B1C2D] text-[#0B1C2D] hover:bg-[#0B1C2D] hover:text-white"
                                : "border-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Commander maintenant
                    </button>

                    {/* Details */}
                    <div className="border-t border-[#0B1C2D]/10 pt-6">
                        <p className="text-xs tracking-widest uppercase text-[#0B1C2D] mb-4">
                            Détails du produit
                        </p>
                        <ul className="flex flex-col gap-2">
                            {(product.details || []).map((detail, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-500 text-sm font-light">
                                    <span className="w-1 h-1 bg-[#C6A75E] rounded-full shrink-0" />
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Guarantees */}
                    <div className="border-t border-[#0B1C2D]/10 pt-6 grid grid-cols-3 gap-4">
                        {guarantees.map((g) => {
                            const Icon = g.icon;
                            return (
                                <div key={g.label} className="flex flex-col items-center text-center gap-2">
                                    <Icon size={18} className="text-[#C6A75E]" />
                                    <p className="text-[#0B1C2D] text-xs font-medium">{g.label}</p>
                                    <p className="text-gray-400 text-xs font-light">{g.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Similar products */}
            <div className="bg-white py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-3">
                            Vous aimerez aussi
                        </p>
                        <h2 className="text-[#0B1C2D] text-3xl font-light">
                            Produits similaires
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {similarProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}