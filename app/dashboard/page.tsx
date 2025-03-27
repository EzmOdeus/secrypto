"use client";

import { useEffect, useState } from "react";
import { getCoins, getNews } from "@/lib/api";
import { CoinList } from "@/components/CoinList";
import { AlertsPanel } from "@/components/AlertsPanel";
import { NewsSection } from "@/components/NewsSection";
import { CoinCard } from "@/components/CoinCard";

export default function DashboardPage() {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [coins, setCoins] = useState<any[]>([]);
    const [news, setNews] = useState<any[]>([]);

    useEffect(() => {
        const fav = localStorage.getItem("favorites");
        const al = localStorage.getItem("alerts");

        if (fav) setFavorites(JSON.parse(fav));
        if (al) setAlerts(JSON.parse(al));

        async function fetchData() {
            const [coinsData, newsData] = await Promise.all([getCoins(), getNews()]);
            setCoins(coinsData);
            setNews(newsData);
        }

        fetchData();
    }, []);

    const favoriteCoins = coins.filter((coin: any) => favorites.includes(coin.id));

    return (
        <main className="p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

            {/* مفضلات */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">❤️ Favorites</h2>
                {favoriteCoins.length > 0 ? (
                    <CoinCard coins={favoriteCoins} />
                ) : (
                    <p className="text-gray-500">No favorites yet.</p>
                )}
            </section>

            {/* تنبيهات */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-2">📢 Alerts</h2>
                {alerts.length > 0 ? (
                    <AlertsPanel alerts={alerts} />
                ) : (
                    <p className="text-gray-500">No alerts yet.</p>
                )}
            </section>

            {/* أخبار */}
            <section>
                <h2 className="text-xl font-semibold mb-2">📰 News</h2>
                <NewsSection articles={news} />
            </section>
        </main>
    );
}
