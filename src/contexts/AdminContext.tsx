"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Admin {
    email: string;
    timestamp: number;
}

interface AdminContextType {
    isAuthenticated: boolean;
    admin: Admin | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    // Check authentication on mount
    useEffect(() => {
        try {
            const adminToken = localStorage.getItem("adminToken");
            if (adminToken) {
                const parsedAdmin = JSON.parse(adminToken) as Admin;
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setAdmin(parsedAdmin);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Failed to load admin token:", error);
            localStorage.removeItem("adminToken");
        }
        setIsMounted(true);
    }, []);

    const login = (email: string, password: string): boolean => {
        // Simple authentication (replace with actual backend call)
        if (email === "admin@korsar.com" && password === "admin123") {
            const newAdmin: Admin = {
                email,
                timestamp: Date.now(),
            };
            localStorage.setItem("adminToken", JSON.stringify(newAdmin));
            setAdmin(newAdmin);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        setAdmin(null);
        setIsAuthenticated(false);
    };

    if (!isMounted) {
        return null;
    }

    return (
        <AdminContext.Provider value={{ isAuthenticated, admin, login, logout }}>
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