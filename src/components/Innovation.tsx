"use client";

import { DM_Sans } from "next/font/google";
import { Droplets, Wind, RefreshCw } from "lucide-react";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const innovations = [
    {
        icon: Droplets,
        title: "Résistance à l'eau",
        description:
            "Nos tissus sont traités avec une technologie DWR (Durable Water Repellent) qui repousse l'eau sans compromettre la respirabilité. Conçu pour affronter les éléments.",
        stat: "IPX4",
        statLabel: "Water Resistance",
    },
    {
        icon: Wind,
        title: "Construction respirante",
        description:
            "Une architecture textile en couches qui laisse circuler l'air et évacue l'humidité. Tu restes au sec de l'intérieur comme de l'extérieur.",
        stat: "3L",
        statLabel: "Breathable Layers",
    },
    {
        icon: RefreshCw,
        title: "Performances durables",
        description:
            "Des matières techniques pensées pour durer des années sans perdre leur forme ni leurs propriétés. Moins acheter, mieux choisir.",
        stat: "500+",
        statLabel: "Wash Cycles",
    },
];

export default function TechInnovation() {
    return (
        <section className={`${dmSans.className} bg-[#0B1C2D] py-24 px-6`}>
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-white text-4xl md:text-5xl font-light">
                            Innovation Technique
                        </h2>
                    </div>
                    <p className="text-gray-400 font-light max-w-sm text-sm leading-relaxed">
                        Chaque pièce Korsar intègre des technologies textiles pensées pour performer dans les conditions les plus exigeantes.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {innovations.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.title}
                                className="bg-[#0f2438] border border-white/10 rounded-3xl hover:border-[#C6A75E] p-10 flex flex-col gap-6 group transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#C6A75E]/10"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-4xl group-hover:border-[#C6A75E] group-hover:text-[#C6A75E] text-white transition-all duration-300">
                                    <Icon size={20} />
                                </div>

                                {/* Stat */}
                                <div>
                                    <p className="text-[#C6A75E] text-4xl font-light">
                                        {item.stat}
                                    </p>
                                    <p className="text-gray-500 text-xs tracking-widest uppercase mt-1">
                                        {item.statLabel}
                                    </p>
                                </div>

                                {/* Text */}
                                <div>
                                    <h3 className="text-white text-xl font-light mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}