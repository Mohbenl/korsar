"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    image?: string;
    images?: string[];
    category: string;
    rating: number;
    reviews: number;
    sizes: string[];
    description?: string;
    details?: string[];
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    category: string;
    rating: number;
    reviews: number;
    size: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, size?: string, quantity?: number) => void;
    removeFromCart: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const hydrationDoneRef = useRef(false);

    // Hydration effect - charge le panier depuis localStorage une seule fois
    useEffect(() => {
        if (hydrationDoneRef.current) return;

        try {
            const saved = localStorage.getItem("korsar-cart");
            if (saved) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setCart(JSON.parse(saved) as CartItem[]);
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage:", error);
        }

        hydrationDoneRef.current = true;
    }, []);

    // Persistance effect - sauvegarde le panier dans localStorage
    useEffect(() => {
        if (!hydrationDoneRef.current) return;

        try {
            localStorage.setItem("korsar-cart", JSON.stringify(cart));
        } catch (error) {
            console.error("Failed to save cart to localStorage:", error);
        }
    }, [cart]);

    const addToCart = (product: Product, size: string = "M", quantity: number = 1) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === product.id && i.size === size);

            if (existing) {
                return prev.map((i) =>
                    i.id === product.id && i.size === size
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }

            const newItem: CartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                rating: product.rating,
                reviews: product.reviews,
                size,
                quantity,
            };

            return [...prev, newItem];
        });
    };

    const removeFromCart = (productId: string, size: string) => {
        setCart((prev) => prev.filter((i) => !(i.id === productId && i.size === size)));
    };

    const updateQuantity = (productId: string, size: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId, size);
            return;
        }

        setCart((prev) =>
            prev.map((i) =>
                i.id === productId && i.size === size ? { ...i, quantity } : i
            )
        );
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () => cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

    const getCartItemCount = () => cart.reduce((acc, i) => acc + i.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartItemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};