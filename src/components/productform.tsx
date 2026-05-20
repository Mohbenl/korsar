"use client";

import React, { useState } from "react";
import {createProduct, updateProduct, uploadProductImage} from "@/lib/product";
import type { Product } from "@/lib/product";



interface ProductFormProps {
    showAddProduct: boolean;
    editingId: string | null;
    formData: Partial<Product>;
    setFormData: React.Dispatch<React.SetStateAction<Partial<Product>>>;
    setShowAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess: () => void; // refresh list
}

export default function ProductForm({
                                        showAddProduct,
                                        editingId,
                                        formData,
                                        setFormData,
                                        setShowAddProduct,
                                        onSuccess,
                                    }: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    if (!showAddProduct) return null;

    const handleSubmit = async () => {
        try {
            setLoading(true);
            let imageUrl = formData.image || "";

            if (selectedFile) {
                imageUrl = await uploadProductImage(selectedFile);
            }
            const payload = {
                name: formData.name!,
                price: formData.price!,
                categorie: formData.categorie!,
                image: imageUrl,
                rating: formData.rating || 0,
                quantity: formData.quantity || 0,
                sizes: formData.sizes || [],
            };

            if (editingId) {
                await updateProduct(editingId, payload);
            } else {
                await createProduct(payload);
            }

            onSuccess();
            setShowAddProduct(false);
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'enregistrement");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm p-4">

            {/* MODAL */}
            <div className="bg-white rounded-2xl shadow-2xl border border-[#0B1C2D]/10 p-4 sm:p-6 w-full max-w-2xl my-6 mx-auto relative animate-[fadeIn_0.2s_ease]">

                {/* CLOSE */}
                <button
                    onClick={() => setShowAddProduct(false)}
                    className="absolute top-4 right-4 text-[#0B1C2D]/40 hover:text-red-400 transition-all text-xl cursor-pointer"
                >
                    ✕
                </button>

                {/* TITLE */}
                <h3 className="text-lg sm:text-xl font-light text-[#0B1C2D] mb-6">
                    {editingId ? "Modifier le produit" : "Ajouter un produit"}
                </h3>

                {/* FORM */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                    {/* NOM */}
                    <div>
                        <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                            Nom du produit
                        </label>

                        <input
                            type="text"
                            placeholder="Ex: Technical Jacket"
                            value={formData.name || ""}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D]"
                        />
                    </div>

                    {/* PRIX */}
                    <div>
                        <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                            Prix (DA)
                        </label>

                        <input
                            type="number"
                            placeholder="Ex: 12900"
                            value={formData.price || 0}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    price: parseFloat(e.target.value),
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D]"
                        />
                    </div>

                    {/* CATEGORIE */}
                    <div>
                        <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                            Catégorie
                        </label>

                        <select
                            value={formData.categorie || "Vestes"}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    categorie: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D]"
                        >
                            <option value="Vestes">Vestes</option>
                            <option value="Overshirts">Overshirts</option>
                            <option value="Sweats">Sweats</option>
                            <option value="Pantalons">Pantalons</option>
                            <option value="T-Shirts">T-Shirts</option>
                            <option value="Accessoires">Accessoires</option>
                        </select>
                    </div>

                    {/* RATING */}
                    <div>
                        <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                            Rating
                        </label>

                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            placeholder="Ex: 4.8"
                            value={formData.rating || 0}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    rating: parseFloat(e.target.value),
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D]"
                        />
                    </div>

                    {/* QUANTITE */}
                    <div>
                        <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                            Quantité
                        </label>

                        <input
                            type="number"
                            min="0"
                            placeholder="Ex: 124"
                            value={formData.quantity || 0}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    quantity: parseInt(e.target.value),
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D]"
                        />
                    </div>

                    {/* TAILLES */}
                    <div>
                        <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-2 block">
                            Tailles disponibles
                        </label>

                        <input
                            type="text"
                            placeholder="Ex: S,M,L,XL"
                            value={
                                Array.isArray(formData.sizes)
                                    ? formData.sizes.join(",")
                                    : typeof formData.sizes === "string"
                                        ? formData.sizes
                                        : ""
                            }
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    sizes: e.target.value
                                        .split(",")
                                        .map((s) => s.trim()),
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-[#0B1C2D]/10 focus:border-[#C6A75E] outline-none transition-all duration-300 text-[#0B1C2D]"
                        />
                    </div>

                    {/* IMAGE UPLOAD */}
                    <div className="md:col-span-2">
                        <label className="text-xs tracking-widest uppercase text-[#C6A75E] mb-3 block">
                            Image du produit
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">

                            {/* UPLOAD BOX */}
                            <label className="md:col-span-2 flex items-center justify-center border border-dashed border-[#0B1C2D]/20 rounded-xl h-32 sm:h-40 cursor-pointer hover:border-[#C6A75E] transition bg-[#F5F3EE] p-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        setSelectedFile(file);

                                        setFormData({
                                            ...formData,
                                            image: URL.createObjectURL(file),
                                        });
                                    }}
                                />

                                <div className="text-center">
                                    <p className="text-sm text-[#0B1C2D]">
                                        Glisser ou cliquer pour ajouter une image
                                    </p>
                                    <p className="text-xs text-[#0B1C2D]/40 mt-1">
                                        JPG, PNG, WEBP
                                    </p>
                                </div>
                            </label>

                            {/* PREVIEW */}
                            <div className="h-32 sm:h-40 w-full rounded-xl border border-[#0B1C2D]/10 overflow-hidden bg-white flex items-center justify-center">
                                {formData.image ? (
                                    <img
                                        src={formData.image}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xs text-[#0B1C2D]/40"> Aperçu image</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* BUTTON */}
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-6 sm:mt-8 px-6 py-3 rounded-xl cursor-pointer bg-[#0B1C2D] text-white hover:bg-[#C6A75E] transition-all duration-300 text-sm tracking-widest uppercase"
                >
                    {loading ? "Loading..." : editingId ? "Modifier" : "Ajouter"}
                </button>
            </div>
        </div>
    );
}