"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Coin = {
    id: string;
    name: string;
};

type Alert = {
    id: string;
    coinId: string;
    coinName: string;
    price: number;
    direction: "above" | "below";
};

export default function AlertsPage() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [selectedCoin, setSelectedCoin] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [direction, setDirection] = useState<"above" | "below">("above");
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then((res) => res.json())
            .then((data) => {
                const top = data.map((coin: any) => ({
                    id: coin.id,
                    name: coin.name,
                }));
                setCoins(top);
                setSelectedCoin(top[0]?.id || "");
            });
    }, []);

    useEffect(() => {
        const storedAlerts = localStorage.getItem("alerts");
        if (storedAlerts) {
            setAlerts(JSON.parse(storedAlerts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("alerts", JSON.stringify(alerts));
    }, [alerts]);

    useEffect(() => {
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (alerts.length === 0) return;
            const ids = alerts.map((a) => a.coinId).join(",");
            fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`)
                .then((res) => res.json())
                .then((prices) => {
                    const triggered: string[] = [];
                    alerts.forEach((alert) => {
                        const currentPrice = prices[alert.coinId]?.usd;
                        if (!currentPrice) return;

                        const match =
                            (alert.direction === "above" && currentPrice > alert.price) ||
                            (alert.direction === "below" && currentPrice < alert.price);

                        if (match) {
                            notifyUser(alert.coinName, alert.direction, alert.price, currentPrice);
                            triggered.push(alert.id);
                        }
                    });
                    setAlerts((prev) => prev.filter((a) => !triggered.includes(a.id)));
                });
        }, 30000);

        return () => clearInterval(interval);
    }, [alerts]);

    const notifyUser = (
        name: string,
        direction: "above" | "below",
        threshold: number,
        current: number
    ) => {
        if (Notification.permission === "granted") {
            new Notification(`${name} Alert`, {
                body: `${name} is ${direction} $${threshold} (Now: $${current.toFixed(2)})`,
            });
        }
    };

    const addAlert = () => {
        if (!selectedCoin || !price) return;

        const coinName = coins.find((c) => c.id === selectedCoin)?.name || selectedCoin;
        const newAlert: Alert = {
            id: uuidv4(),
            coinId: selectedCoin,
            coinName,
            price: Number(price),
            direction,
        };

        setAlerts((prev) => [...prev, newAlert]);
        setPrice("");
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Create Price Alert</h1>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <select
                    value={selectedCoin}
                    onChange={(e) => setSelectedCoin(e.target.value)}
                    className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
                >
                    {coins.map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>

                <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as "above" | "below")}
                    className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
                >
                    <option value="above">Above</option>
                    <option value="below">Below</option>
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="p-2 border rounded w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
                />

                <button
                    onClick={addAlert}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Alert
                </button>
            </div>

            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Your Alerts</h2>
            {alerts.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">No alerts set.</p>
            ) : (
                <ul className="space-y-3">
                    {alerts.map((alert) => (
                        <li
                            key={alert.id}
                            className="p-4 border rounded flex justify-between items-center dark:border-gray-700 dark:bg-gray-900"
                        >
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-white">{alert.coinName}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {alert.direction} ${alert.price}
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    setAlerts((prev) => prev.filter((a) => a.id !== alert.id))
                                }
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
