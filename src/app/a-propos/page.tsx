"use client";

import Image from "next/image";
import { DM_Sans } from "next/font/google";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const values = [
    {
        number: "01",
        title: "Authenticité",
        description:
            "Korsar ne suit pas les tendances — on les ignore. Chaque pièce reflète une vision claire, sans compromis sur l'identité.",
    },
    {
        number: "02",
        title: "Qualité sans concession",
        description:
            "Des matières premium, des finitions soignées, une construction qui dure. On préfère faire moins, mais faire bien.",
    },
    {
        number: "03",
        title: "Exclusivité",
        description:
            "Pas de restock. Pas de surproduction. Chaque drop est limité — parce que la rareté a de la valeur.",
    },
    {
        number: "04",
        title: "Héritage local",
        description:
            "Né en Algérie, inspiré par la Méditerranée. Korsar porte en lui l'énergie d'une culture riche et d'une jeunesse qui s'affirme.",
    },
];

const stats = [
    { value: "2024", label: "Année de création" },
    { value: "100%", label: "Qualité premium" },
    { value: "Limited", label: "Drops exclusifs" },
    { value: "DZ", label: "Made in Algeria" },
];

export default function AProposPage() {
    return (
        <div className={`${dmSans.className} bg-[#F5F3EE] min-h-screen`}>
            <Navbar />
            {/* Hero */}
            <div className="bg-[#0B1C2D] pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
                    <div>
                        <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-4">
                            Notre histoire
                        </p>
                        <h1 className="text-white text-5xl md:text-6xl font-light leading-tight">
                            Born from the sea. <br />
                            <span className="text-[#C6A75E]">Built for the city.</span>
                        </h1>
                    </div>
                    <p className="text-gray-400 font-light text-lg leading-relaxed">
                        Korsar est né de la rencontre entre l&#39;héritage maritime algérien
                        et l&#39;énergie brute des rues urbaines. Une marque pensée pour ceux
                        qui refusent de choisir entre style et liberté.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-[#0B1C2D] border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1">
                            <p className="text-[#C6A75E] text-3xl font-light">{stat.value}</p>
                            <p className="text-gray-500 text-xs tracking-widest uppercase">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Story */}
            <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                        src="/image/propos.png"
                        alt="Korsar Story"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-[2px] h-1/2 bg-[#C6A75E]" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-[#C6A75E]" />
                </div>

                <div className="flex flex-col gap-6">
                    <p className="text-[#C6A75E] text-xs tracking-widest uppercase">
                        L&#39;origine
                    </p>
                    <h2 className="text-[#0B1C2D] text-4xl font-light leading-tight">
                        Une marque qui assume ses racines
                    </h2>
                    <p className="text-gray-500 font-light leading-relaxed">
                        Le nom Korsar vient du mot &ldquo;corsaire&rdquo; — ces navigateurs libres
                        qui ne répondaient qu&#39;à leurs propres règles. C&#39;est cette même
                        philosophie qui guide chaque décision de la marque : indépendance,
                        audace, et refus du conformisme.
                    </p>
                    <p className="text-gray-500 font-light leading-relaxed">
                        Inspirés par les ports méditerranéens, les matières techniques
                        et la culture urbaine algérienne, nos pièces sont conçues pour
                        durer — dans le temps et dans le style.
                    </p>
                </div>
            </div>

            {/* Values */}
            <div className="bg-[#0B1C2D] py-24 px-6 mb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-3">
                            Ce qu&#39;on défend
                        </p>
                        <h2 className="text-white text-4xl font-light">
                            Nos valeurs
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
                        {values.map((value) => (
                            <div
                                key={value.number}
                                className="bg-[#0B1C2D] p-10 flex flex-col gap-4 hover:bg-[#0f2438] transition-all duration-300"
                            >
                                <p className="text-[#C6A75E] text-xs tracking-widest">
                                    {value.number}
                                </p>
                                <h3 className="text-white text-xl font-light">
                                    {value.title}
                                </h3>
                                <p className="text-gray-400 text-sm font-light leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}