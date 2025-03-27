"use client";

import { useEffect, useState } from "react";
import { useFavorites } from "@/app/context/FavoritesContext";
import { getCoins } from "@/lib/coinApi";
import { CoinCard } from "@/components/CoinCard";

export default function FavoritesPage() {
    const { favorites } = useFavorites();
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        async function load() {
            const all = await getCoins();
            const filtered = all.filter((c: any) => favorites.includes(c.id));
            setCoins(filtered);
        }
        load();
    }, [favorites]);

    return (
        <section className="px-6 py-8">
            <h1 className="text-2xl font-bold mb-4">⭐ My Favorites</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {coins.map((coin:any) => (
                    <CoinCard
                        key={coin.id}
                        id={coin.id}
                        name={coin.name}
                        symbol={coin.symbol}
                        price={coin.current_price}
                        image={coin.image}
                    />
                ))}
            </div>
        </section>
    );
}
