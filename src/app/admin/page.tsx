"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/contexts/AdminContext";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const AdminLoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const { login } = useAdmin();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setIsLoading(true);

        if (login(email, password)) {
            router.push("/admin/dashboard");
        } else {
            setError("Email ou mot de passe incorrect");
        }

        setIsLoading(false);
    };

    return (
        <div className={`${dmSans.className} bg-[#F5F3EE] min-h-screen flex items-center justify-center px-6`}>
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A75E]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C6A75E]/5 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-12">
                    <Link href="/" className="inline-block mb-8">
                        <h2 className="text-4xl font-light text-[#0B1C2D]">
                            Korsar<span className="text-[#C6A75E]">.</span>
                        </h2>
                    </Link>
                    <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2">
                        Espace administrateur
                    </p>
                    <h1 className="text-3xl font-light text-[#0B1C2D]">
                        Connexion Admin
                    </h1>
                </div>

                {/* Card */}
                <div className="bg-white border border-[#0B1C2D]/10 p-8">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-light animate-in fade-in">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                Email
                            </label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0B1C2D]/30" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-[#0B1C2D]/10 text-[#0B1C2D] placeholder-[#0B1C2D]/30 text-sm outline-none focus:border-[#C6A75E] transition-all duration-300"
                                    placeholder="admin@korsar.dz"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                                Mot de passe
                            </label>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#0B1C2D]/30" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-3 border border-[#0B1C2D]/10 text-[#0B1C2D] placeholder-[#0B1C2D]/30 text-sm outline-none focus:border-[#C6A75E] transition-all duration-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 cursor-pointer bg-[#0B1C2D] text-white flex items-center justify-center gap-2 hover:bg-[#C6A75E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-widest uppercase font-light mt-6"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Connexion...</span>
                                </>
                            ) : (
                                <>
                                    <span>Se connecter</span>
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-8 pt-8 border-t border-[#0B1C2D]/10">
                        <p className="text-xs text-[#0B1C2D]/50 text-center mb-3">
                            Identifiants de démo
                        </p>
                        <div className="bg-[#F5F3EE] rounded p-4 space-y-2 text-xs text-[#0B1C2D]/70">
                            <div className="flex justify-between">
                                <span>Email :</span>
                                <code className="font-light text-[#C6A75E]">admin@korsar.com</code>
                            </div>
                            <div className="flex justify-between">
                                <span>Mot de passe :</span>
                                <code className="font-light text-[#C6A75E]">admin123</code>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-xs text-[#0B1C2D]/50">
                        <Link href="/" className="hover:text-[#C6A75E] transition-colors">
                            ← Retour à l&#39;accueil
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;