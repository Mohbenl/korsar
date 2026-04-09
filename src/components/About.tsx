"use client";

import Image from "next/image";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

export default function BrandStatement() {
    return (
        <section className={`${dmSans.className} bg-[#0B1C2D] py-24 px-6`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                        src="/image/about.png"
                        alt="Korsar Brand"
                        fill
                        className="object-cover"
                    />
                    {/* Gold border accent */}
                    <div className="absolute bottom-0 left-0 w-[2px] h-1/2 bg-[#C6A75E]" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-[#C6A75E]" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-8">
                    <p className="text-[#C6A75E] text-xs tracking-widest uppercase">
                        Notre Histoire
                    </p>

                    <h2 className="text-white text-4xl md:text-5xl font-light leading-tight">
                        Born from the sea.{" "}
                        <span className="text-[#C6A75E]">Built for the city.</span>
                    </h2>

                    <p className="text-gray-400 text-lg leading-relaxed font-light">
                        Korsar est né de la rencontre entre l&#39;héritage maritime algérien
                        et l&#39;énergie des rues urbaines. Chaque pièce est pensée pour
                        ceux qui refusent de choisir entre style et liberté.
                    </p>

                    <p className="text-gray-400 text-lg leading-relaxed font-light">
                        Des matières premium, des silhouettes intemporelles, et des
                        drops limités — parce que la rareté a de la valeur.
                    </p>

                    <div className="flex gap-12 pt-4 border-t border-white/10">
                        <div>
                            <p className="text-white text-3xl font-light">100%</p>
                            <p className="text-gray-500 text-sm tracking-widest uppercase mt-1">Premium Quality</p>
                        </div>
                        <div>
                            <p className="text-white text-3xl font-light">Limited</p>
                            <p className="text-gray-500 text-sm tracking-widest uppercase mt-1">Drops Only</p>
                        </div>
                        <div>
                            <p className="text-white text-3xl font-light">Local</p>
                            <p className="text-gray-500 text-sm tracking-widest uppercase mt-1">Craftsmanship</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}