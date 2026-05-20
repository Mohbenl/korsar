"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

interface Admin {
    email: string;
}

interface AdminContextType {
    isAuthenticated: boolean;
    admin: Admin | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // 🔥 CHECK SESSION SUPABASE AU CHARGEMENT
    useEffect(() => {
        const initSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            console.log("SESSION INIT:", session);

            if (session) {
                setIsAuthenticated(true);
                setAdmin({
                    email: session.user.email || "",
                });
            } else {
                setIsAuthenticated(false);
                setAdmin(null);
            }

            setIsMounted(true);
        };

        initSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                console.log("AUTH CHANGE:", session);

                if (session) {
                    setIsAuthenticated(true);
                    setAdmin({
                        email: session.user.email || "",
                    });
                } else {
                    setIsAuthenticated(false);
                    setAdmin(null);
                }
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    // 🔥 LOGIN SUPABASE
    const login = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error(error.message);
            return false;
        }

        return true;
    };

    // 🔥 LOGOUT SUPABASE
    const logout = async () => {
        await supabase.auth.signOut();
        setAdmin(null);
        setIsAuthenticated(false);
    };

    if (!isMounted) return null;

    return (
        <AdminContext.Provider
            value={{ isAuthenticated, admin, login, logout }}
        >
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = (): AdminContextType => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within AdminProvider");
    }
    return context;
};