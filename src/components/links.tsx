import Link from "next/link";
import {ArrowRight} from "lucide-react";



export default  function Links () {

    return (
        <div className="bg-white border border-[#0B1C2D]/10 p-8">
            <p className="text-xs tracking-widest uppercase text-[#C6A75E] mb-6">
                Navigation rapide
            </p>
            <div className="grid grid-rows-1 md:grid-cols-2 gap-4">
                <Link
                    href="/admin/dashboard/produits"
                    className="flex items-center justify-between p-4 border border-[#0B1C2D]/10 hover:border-[#C6A75E] hover:bg-[#F5F3EE] transition-all duration-300 group"
                >
                            <span className="text-sm tracking-widest uppercase text-[#0B1C2D] font-light">
                                Gérer les produits
                            </span>
                    <ArrowRight size={16} className="text-[#C6A75E] group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                    href="/admin/dashboard/commandes"
                    className="flex items-center justify-between p-4 border border-[#0B1C2D]/10 hover:border-[#C6A75E] hover:bg-[#F5F3EE] transition-all duration-300 group"
                >
                            <span className="text-sm tracking-widest uppercase text-[#0B1C2D] font-light">
                                Voir les commandes
                            </span>
                    <ArrowRight size={16} className="text-[#C6A75E] group-hover:translate-x-1 transition-all" />
                </Link>

                <Link
                    href="/admin/dashboard/commandes"
                    className="flex items-center justify-between p-4 border border-[#0B1C2D]/10 hover:border-[#C6A75E] hover:bg-[#F5F3EE] transition-all duration-300 group"
                >
                            <span className="text-sm tracking-widest uppercase text-[#0B1C2D] font-light">
                                Voir les Utilisateurs
                            </span>
                    <ArrowRight size={16} className="text-[#C6A75E] group-hover:translate-x-1 transition-all" />
                </Link>
            </div>
        </div>
    );


};