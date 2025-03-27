"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FavoritesContextType = {
    favorites: string[];
    toggleFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) setFavorites(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((coin) => coin !== id) : [...prev, id]
        );
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
    return context;
}
