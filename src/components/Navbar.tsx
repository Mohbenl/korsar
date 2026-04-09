"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { DM_Sans } from "next/font/google";
import { useCart } from "@/contexts/CartContext";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [scrolled, setScrolled] = useState(!isHomePage);
    const { getCartItemCount } = useCart();
    const cartCount = getCartItemCount();

    useLayoutEffect(() => {
        if (!isHomePage) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setScrolled(true);
            return () => setScrolled(false);
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            setScrolled(false);
        };
    }, [isHomePage]);

    const links = [
        { label: "Accueil", href: "/" },
        { label: "Produit", href: "/produit" },
        { label: "À propos", href: "/a-propos" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={`${dmSans.className} fixed top-0 w-full z-50 transition-all duration-500 ${
                scrolled ? "bg-[#F5F3EE] shadow-md" : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/image/KORSAR.webp"
                            alt="Korsar Logo"
                            width={80}
                            height={80}
                        />
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase">
                        {links.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`relative transition duration-300 group ${
                                        isActive
                                            ? "text-[#C6A75E]"
                                            : scrolled
                                                ? "text-[#0B1C2D] hover:text-[#C6A75E]"
                                                : "text-white hover:text-[#C6A75E]"
                                    }`}
                                >
                                    {item.label}
                                    <span
                                        className={`absolute left-0 -bottom-2 h-[1px] bg-[#C6A75E] transition-all duration-300 ${
                                            isActive ? "w-full" : "w-0 group-hover:w-full"
                                        }`}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Icons */}
                    <div className={`hidden md:flex items-center gap-6 ${scrolled ? "text-[#0B1C2D]" : "text-white"}`}>
                        {/* Panier */}
                        <Link href="/panier" className="relative hover:text-[#C6A75E] transition">
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#C6A75E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/admin">
                            <User className="cursor-pointer hover:text-[#C6A75E] transition" size={22}/>
                        </Link>
                    </div>

                    {/* Mobile button */}
                    <div className="md:hidden flex items-center gap-4 z-50">
                        {/* Panier mobile */}
                        <Link
                            href="/panier"
                            className={`relative ${scrolled ? "text-black" : "text-white"} hover:text-[#C6A75E] transition`}
                        >
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#C6A75E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={scrolled ? "text-black" : "text-white"}
                        >
                            {menuOpen ? <X size={30} /> : <Menu size={30} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-10 text-2xl transition-transform duration-500 ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {links.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={`tracking-widest uppercase ${
                                isActive ? "text-[#C6A75E]" : "text-[#0B1C2D] hover:text-[#C6A75E]"
                            }`}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}