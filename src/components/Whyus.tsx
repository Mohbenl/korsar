"use client";

import { DM_Sans } from "next/font/google";
import { Shield, Truck, Zap, Scissors } from "lucide-react";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const features = [
    {
        icon: Scissors,
        title: "Premium Quality",
        description:
            "Des matières soigneusement sélectionnées pour leur durabilité et leur confort. Chaque couture est pensée pour durer.",
    },
    {
        icon: Zap,
        title: "Limited Drops",
        description:
            "Pas de restocks. Pas de surproduction. Chaque pièce est exclusive — si tu la rates, elle disparaît.",
    },
    {
        icon: Shield,
        title: "Satisfait ou Remboursé",
        description:
            "30 jours pour changer d'avis. On assume la qualité de ce qu'on produit, sans condition.",
    },
    {
        icon: Truck,
        title: "Livraison Rapide",
        description:
            "Expédition sous 48h partout en Algérie. Suivi en temps réel inclus à chaque commande.",
    },
];

export default function WhyKorsar() {
    return (
        <section className={`${dmSans.className} bg-[#F5F3EE] py-24 px-6`}>
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-3">
                        L&#39;engagement Korsar
                    </p>
                    <h2 className="text-[#0B1C2D] text-4xl md:text-5xl font-light">
                        Pourquoi Korsar ?
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="flex flex-col items-start gap-4 p-6 border border-[#0B1C2D]/10 hover:border-[#C6A75E] transition-all duration-300 group"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 flex items-center justify-center border border-[#0B1C2D]/20 group-hover:border-[#C6A75E] group-hover:text-[#C6A75E] transition-all duration-300 text-[#0B1C2D]">
                                    <Icon size={20} />
                                </div>

                                {/* Title */}
                                <h3 className="text-[#0B1C2D] text-lg font-medium tracking-wide">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-500 text-sm leading-relaxed font-light">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}