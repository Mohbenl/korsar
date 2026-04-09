"use client";

import { useState } from "react";
import { DM_Sans } from "next/font/google";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const TikTokIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
);

const contacts = [
    {
        icon: Mail,
        label: "Email",
        value: "contact@korsar.dz",
        href: "mailto:contact@korsar.dz",
    },
    {
        icon: Phone,
        label: "Téléphone",
        value: "+213 XX XX XX XX",
        href: "tel:+213XXXXXXXX",
    },
    {
        icon: MapPin,
        label: "Localisation",
        value: "Alger, Algérie",
        href: null,
    },
];

const socials = [
    { icon: Instagram, href: "https://instagram.com/korsar", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/korsar", label: "Facebook" },
    { icon: TikTokIcon, href: "https://tiktok.com/@korsar", label: "TikTok" },
];

export default function ContactPage() {
    const [form, setForm] = useState({ nom: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.nom || !form.email || !form.message) return;
        setSubmitted(true);
    };

    return (
        <div className={`${dmSans.className} bg-[#F5F3EE] min-h-screen`}>
            <Navbar />
            {/* Header */}
            <div className="bg-[#0B1C2D] pt-40 pb-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <p className="text-[#C6A75E] text-xs tracking-widest uppercase mb-4">
                        On est là
                    </p>
                    <h1 className="text-white text-5xl md:text-6xl font-light leading-tight">
                        Contactez-nous
                    </h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Left — infos */}
                <div className="flex flex-col gap-12">

                    <p className="text-gray-500 font-light text-lg leading-relaxed">
                        Une question sur une commande, un drop à venir, ou juste envie
                        d&apos;en savoir plus sur Korsar ? On vous répond dans les plus brefs délais.
                    </p>

                    {/* Contact infos */}
                    <div className="flex flex-col gap-6">
                        {contacts.map((contact) => {
                            const Icon = contact.icon;
                            return (
                                <div key={contact.label} className="flex items-center gap-4">
                                    <div className="w-10 h-10 border border-[#0B1C2D]/20 flex items-center justify-center text-[#0B1C2D] shrink-0">
                                        <Icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-1">
                                            {contact.label}
                                        </p>
                                        {contact.href ? (
                                            <a
                                                href={contact.href}
                                                className="text-[#0B1C2D] text-sm font-light hover:text-[#C6A75E] transition-colors duration-200"
                                            >
                                                {contact.value}
                                            </a>
                                        ) : (
                                            <p className="text-[#0B1C2D] text-sm font-light">
                                                {contact.value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Socials */}
                    <div>
                        <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-4">
                            Nos réseaux
                        </p>
                        <div className="flex gap-4">
                            {socials.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 border border-[#0B1C2D]/20 flex items-center justify-center text-[#0B1C2D] hover:border-[#C6A75E] hover:text-[#C6A75E] transition-all duration-300 hover:scale-105"
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right — form */}
                <div>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E]">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    value={form.nom}
                                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                                    placeholder="Votre nom"
                                    required
                                    className="bg-white border border-[#0B1C2D]/15 px-5 py-4 text-[#0B1C2D] placeholder-gray-400 text-sm outline-none focus:border-[#C6A75E] transition-all duration-300"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="Votre email"
                                    required
                                    className="bg-white border border-[#0B1C2D]/15 px-5 py-4 text-[#0B1C2D] placeholder-gray-400 text-sm outline-none focus:border-[#C6A75E] transition-all duration-300"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-widest uppercase text-[#C6A75E]">
                                    Message
                                </label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder="Votre message..."
                                    required
                                    rows={6}
                                    className="bg-white border border-[#0B1C2D]/15 px-5 py-4 text-[#0B1C2D] placeholder-gray-400 text-sm outline-none focus:border-[#C6A75E] transition-all duration-300 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="bg-[#0B1C2D] text-white px-8 cursor-pointer py-4 text-sm tracking-widest uppercase hover:bg-[#C6A75E] transition-all duration-300 self-start"
                            >
                                Envoyer le message
                            </button>
                        </form>
                    ) : (
                        <div className="border border-[#C6A75E] p-10 flex flex-col gap-4">
                            <p className="text-[#C6A75E] text-xs tracking-widest uppercase">
                                Message envoyé
                            </p>
                            <p className="text-[#0B1C2D] text-2xl font-light">
                                Merci, on revient vers vous rapidement.
                            </p>
                            <p className="text-gray-500 text-sm font-light">
                                En attendant, suivez-nous sur nos réseaux pour ne rien rater des prochains drops.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}