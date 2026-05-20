"use client";

import { useSearchParams } from "next/navigation";
import {useState, Suspense, useEffect} from "react";
import { DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { getProductById,Product } from "@/lib/product";
import { createOrder, Order, OrderItem } from "@/lib/commande";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const wilayas = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
    "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
    "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda",
    "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
    "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj",
    "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
    "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
    "Ghardaïa", "Relizane",
];



function CommanderContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const productId = searchParams.get("id");
    const size = searchParams.get("size");
    const quantity = parseInt(searchParams.get("quantity") || "1");

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    const total = product ? product.price * quantity : 0;


    useEffect(() => {
        async function loadProduct() {
            if (!productId) {
                setLoading(false);
                return;
            }

            try {
                const data = await getProductById(productId);
                setProduct(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [productId]);

    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        telephone: "",
        adresse: "",
        wilaya: "",
    });



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!product) return;

        try {
            const order: Order = {
                nom: form.nom,
                prenom: form.prenom,
                telephone: form.telephone,
                adresse: form.adresse,
                wilaya: form.wilaya,
                total,
                statut: "En Attente",
            };

            const items: OrderItem[] = [
                {
                    product_id: product.id!,
                    quantite: quantity,
                    taille: size || "",
                    prix: product.price,
                },
            ];

            await createOrder(order, items);

            setSubmitted(true);
        } catch (err) {
            console.error("Erreur création commande:", err);
        }
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-32 text-center">
                <p className="text-gray-400 text-lg font-light">
                    Chargement...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-32 text-center">
                <p className="text-gray-400 text-lg font-light">
                    Produit introuvable.
                </p>
            </div>
        );
    }

    const productImages: string[] = Array.isArray(product?.image)
        ? product.image
        : product?.image
            ? [product.image]
            : [];

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Récapitulatif */}
                <div>
                    <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-6">
                        Récapitulatif
                    </p>

                    <div className="bg-white border border-[#0B1C2D]/10 p-6 flex flex-col gap-6">
                        <div className="flex gap-4">
                            <div className="w-20 h-24 bg-gray-50 relative shrink-0">
                                <img
                                    src={productImages[0]}
                                    alt={product.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[#C6A75E] text-xs tracking-widest uppercase">
                                    {product.categorie}
                                </p>
                                <p className="text-[#0B1C2D] text-lg font-light">
                                    {product.name}
                                </p>
                                <p className="text-gray-400 text-sm">Taille : {size}</p>
                                <p className="text-gray-400 text-sm">Quantité : {quantity}</p>
                            </div>
                        </div>

                        <div className="border-t border-[#0B1C2D]/10 pt-4 flex justify-between items-center">
                            <p className="text-xs tracking-widest uppercase text-[#0B1C2D]">
                                Total
                            </p>
                            <p className="text-[#0B1C2D] text-2xl font-light">
                                {total.toLocaleString()} DA
                            </p>
                        </div>

                        <div className="border-t border-[#0B1C2D]/10 pt-4 flex flex-col gap-2">
                            <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                                Livraison
                            </p>
                            <p className="text-gray-500 text-sm font-light">
                                Livraison sous 48h partout en Algérie.
                            </p>
                            <p className="text-gray-500 text-sm font-light">
                                Paiement à la livraison disponible.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Formulaire */}
                <div>
                    <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-6">
                        Informations de livraison
                    </p>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs tracking-widest uppercase text-[#0B1C2D]/60">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        value={form.nom}
                                        onChange={(e) => setForm({ ...form, nom: e.target.value })}
                                        placeholder="Votre nom"
                                        required
                                        className="bg-white border border-[#0B1C2D]/15 px-4 py-3 text-[#0B1C2D] placeholder-gray-400 text-sm outline-none focus:border-[#C6A75E] transition-all duration-300"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs tracking-widest uppercase text-[#0B1C2D]/60">
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        value={form.prenom}
                                        onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                                        placeholder="Votre prénom"
                                        required
                                        className="bg-white border border-[#0B1C2D]/15 px-4 py-3 text-[#0B1C2D] placeholder-gray-400 text-sm outline-none focus:border-[#C6A75E] transition-all duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-widest uppercase text-[#0B1C2D]/60">
                                    Téléphone
                                </label>
                                <input
                                    type="tel"
                                    value={form.telephone}
                                    onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                                    placeholder="0X XX XX XX XX"
                                    required
                                    className="bg-white border border-[#0B1C2D]/15 px-4 py-3 text-[#0B1C2D] placeholder-gray-400 text-sm outline-none focus:border-[#C6A75E] transition-all duration-300"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-widest uppercase text-[#0B1C2D]/60">
                                    Adresse
                                </label>
                                <input
                                    type="text"
                                    value={form.adresse}
                                    onChange={(e) => setForm({ ...form, adresse: e.target.value })}
                                    placeholder="Votre adresse complète"
                                    required
                                    className="bg-white border border-[#0B1C2D]/15 px-4 py-3 text-[#0B1C2D] placeholder-gray-400 text-sm outline-none focus:border-[#C6A75E] transition-all duration-300"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-widest uppercase text-[#0B1C2D]/60">
                                    Wilaya
                                </label>
                                <select
                                    value={form.wilaya}
                                    onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
                                    required
                                    className="bg-white border border-[#0B1C2D]/15 px-4 py-3 text-[#0B1C2D] text-sm outline-none focus:border-[#C6A75E] transition-all duration-300"
                                >
                                    <option value="">Sélectionnez votre wilaya</option>
                                    {wilayas.map((w) => (
                                        <option key={w} value={w}>{w}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="bg-[#0B1C2D] text-white cursor-pointer px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#C6A75E] transition-all duration-300 mt-2"
                            >
                                Confirmer la commande
                            </button>

                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="border border-[#0B1C2D]/20 cursor-pointer text-[#0B1C2D] px-8 py-4 text-sm tracking-widest uppercase hover:border-[#C6A75E] hover:text-[#C6A75E] transition-all duration-300"
                            >
                                Retour
                            </button>
                        </form>
                    ) : (
                        <div className="border border-[#C6A75E] p-10 flex flex-col gap-4">
                            <p className="text-[#C6A75E] text-xs tracking-widest uppercase">
                                Commande confirmée
                            </p>
                            <p className="text-[#0B1C2D] text-2xl font-light">
                                Merci {form.prenom} !
                            </p>
                            <p className="text-gray-500 text-sm font-light leading-relaxed">
                                Votre commande a bien été reçue. Nous vous contacterons
                                au {form.telephone} pour confirmer la livraison.
                            </p>
                            <button
                                onClick={() => router.push("/")}
                                className="bg-[#0B1C2D] text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#C6A75E] transition-all duration-300 mt-4 self-start"
                            >
                                Retour à l&apos;accueil
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default function CommanderPage() {
    return (
        <div className={`${dmSans.className} bg-[#F5F3EE] min-h-screen`}>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-8">
                <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-3">
                    Finaliser
                </p>
                <h1 className="text-[#0B1C2D] text-5xl md:text-6xl font-light">
                    Ma commande
                </h1>
            </div>

            <div className="border-b border-[#0B1C2D]/10" />

            <Suspense fallback={
                <div className="max-w-7xl mx-auto px-6 py-32 text-center">
                    <p className="text-gray-400 font-light">Chargement...</p>
                </div>
            }>
                <CommanderContent />
            </Suspense>

            <Footer />
        </div>
    );
}