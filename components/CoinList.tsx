"use client";
import { useEffect, useState } from "react";
import { CoinCard } from "./CoinCard";
import { getCoins } from "@/lib/coinApi";
import { SearchBar } from "./SearchBar";

type Coin = {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    image: string;
};

export function CoinList() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [filtered, setFiltered] = useState<Coin[]>([]);

    useEffect(() => {
        async function loadCoins() {
            const data = await getCoins();
            console.log("🚀 ~ loadCoins ~ data:", data)
            setCoins(data);
            setFiltered(data);
        }
        loadCoins();
    }, []);

    const handleSearch = (term: string) => {
        const filteredCoins = coins.filter((coin) =>
            coin.name.toLowerCase().includes(term.toLowerCase())
        );
        setFiltered(filteredCoins);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filtered.map((coin) => (
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
        </div>
    );
}
