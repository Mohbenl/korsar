"use client";

import { useState } from "react";
import { DM_Sans } from "next/font/google";
import { Send } from "lucide-react";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
    };

    return (
        <section className={`${dmSans.className} bg-[#F5F3EE] py-24 px-6`}>
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-8">

                {/* Header */}
                <div>
                    <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-3">
                        Reste informé
                    </p>
                    <h2 className="text-[#0B1C2D] text-4xl md:text-5xl font-light leading-tight">
                        Sois le premier <br />
                        <span className="text-[#C6A75E]">sur les drops.</span>
                    </h2>
                </div>

                <p className="text-gray-500 font-light text-lg leading-relaxed">
                    Inscris-toi pour recevoir en avant-première les nouvelles collections,
                    les drops exclusifs et les offres réservées aux membres.
                </p>

                {/* Form */}
                {!submitted ? (
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col sm:flex-row gap-3"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ton adresse email"
                            required
                            className="flex-1 bg-white border border-[#0B1C2D]/15 px-5 py-4 text-[#0B1C2D] placeholder-gray-400 text-sm outline-none focus:border-[#C6A75E] transition-all duration-300"
                        />
                        <button
                            type="submit"
                            className="bg-[#0B1C2D] text-white px-8 py-4 text-sm tracking-widest cursor-pointer uppercase hover:bg-[#C6A75E] transition-all duration-300 flex items-center gap-2 justify-center"
                        >
                            <span>S&#39;inscrire</span>
                            <Send size={14} />
                        </button>
                    </form>
                ) : (
                    <div className="w-full border border-[#C6A75E] px-8 py-6 text-center">
                        <p className="text-[#0B1C2D] text-lg font-light">
                            Bienvenue dans la famille Korsar.{" "}
                            <span className="text-[#C6A75E]">Tu seras le premier informé.</span>
                        </p>
                    </div>
                )}

                <p className="text-gray-400 text-xs">
                    Pas de spam. Désabonnement en un clic.
                </p>
            </div>
        </section>
    );
}