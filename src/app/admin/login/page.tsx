"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (email === "admin@korsar.com" && password === "admin123") {
            localStorage.setItem("adminLogged", "true");
            router.push("/admin");
        } else {
            setError("Email ou mot de passe incorrect");
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20 bg-[url('/admin-bg-pattern.svg')] bg-cover bg-center"></div>

            <div className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Connexion Admin</h1>
                <p className="text-center text-gray-500 mb-8">Accédez au dashboard Korsar</p>

                <div className="space-y-6">
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            placeholder=" "
                            className="peer w-full border-b-2 border-gray-300 focus:border-black p-2 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-0 top-0 text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            placeholder=" "
                            className="peer w-full border-b-2 border-gray-300 focus:border-black p-2 outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-0 top-0 text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all"
                        >
                            Mot de passe
                        </label>
                    </div>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <button
                    onClick={handleLogin}
                    className="mt-8 w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-all transform hover:-translate-y-1 hover:scale-105"
                >
                    Se connecter
                </button>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    © 2026 Korsar. Tous droits réservés.
                </div>
            </div>
        </div>
    );
}