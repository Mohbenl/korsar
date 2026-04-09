"use client";

import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { Instagram, Facebook} from "lucide-react";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const links = {
    navigation: [
        { label: "Accueil", href: "/" },
        { label: "Produit", href: "/produit" },
        { label: "À propos", href: "/a-propos" },
        { label: "Contact", href: "/contact" },
        { label: "Administration", href: "/admin" },
    ],
    legal: [
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Politique de confidentialité", href: "/confidentialite" },
        { label: "Conditions générales", href: "/cgv" },
    ],
};

const TikTokIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
);

const socials = [
    { icon: Instagram, href: "https://instagram.com/korsar", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/korsar", label: "Facebook" },
    { icon: TikTokIcon, href: "https://tiktok.com/@korsar", label: "TikTok" },
];

export default function Footer() {
    return (
        <footer className={`${dmSans.className} bg-[#0B1C2D] text-white`}>

            {/* Main */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Logo + tagline */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs">
                        Born from the sea. Built for the city. Des pièces premium pour ceux qui refusent de choisir entre style et liberté.
                    </p>
                    {/* Socials */}
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
                                    className="w-10 h-10 border border-white/20 flex items-center justify-center text-white hover:border-[#C6A75E] hover:text-[#C6A75E] transition-all duration-300">
                                    <Icon size={16} />
                                </a>
                        );
                        })}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-4">
                    <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                        Navigation
                    </p>
                    {links.navigation.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-gray-400 text-sm font-light hover:text-white transition-colors duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Legal */}
                <div className="flex flex-col gap-4">
                    <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                        Légal
                    </p>
                    {links.legal.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-gray-400 text-sm font-light hover:text-white transition-colors duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} Corso Tech. Tous droits réservés.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Made in Algeria 🇩🇿
                    </p>
                </div>
            </div>
        </footer>
    );
}