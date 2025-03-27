'use client';

import { useEffect, useState } from 'react';

type Coin = {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    price_change_percentage_24h: number;
    image: string;
};

type Result = {
    diff: number;
    ratio: number;
};

export default function ComparePage() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [firstCoin, setFirstCoin] = useState('');
    const [secondCoin, setSecondCoin] = useState('');
    const [result, setResult] = useState<Result | null>(null);
    const [coinA, setCoinA] = useState<Coin | null>(null);
    const [coinB, setCoinB] = useState<Coin | null>(null);

    useEffect(() => {
        fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        )
            .then((res) => res.json())
            .then((data) => setCoins(data));
    }, []);

    const handleCompare = () => {
        const coinA = coins.find((c) => c.id === firstCoin) || null;
        const coinB = coins.find((c) => c.id === secondCoin) || null;

        if (coinA?.current_price && coinB?.current_price) {
            const diff = coinA.current_price - coinB.current_price;
            const ratio = coinB.current_price !== 0 ? coinA.current_price / coinB.current_price : 0;
            setResult({ diff, ratio });
            setCoinA(coinA);
            setCoinB(coinB);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">🔁 Compare Cryptocurrencies</h1>

            <div className="flex flex-col sm:flex-row gap-4">
                <select
                    value={firstCoin}
                    onChange={(e) => setFirstCoin(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="">Select First Coin</option>
                    {coins.map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>

                <select
                    value={secondCoin}
                    onChange={(e) => setSecondCoin(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="">Select Second Coin</option>
                    {coins.map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleCompare}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Compare
            </button>

            {result && coinA && coinB && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[coinA, coinB].map((coin) => (
                            <div key={coin.id} className="border p-4 rounded shadow bg-white dark:bg-gray-900">
                                <div className="flex items-center gap-4">
                                    <img src={coin.image} alt={coin.name} className="w-12 h-12" />
                                    <div>
                                        <h2 className="font-bold text-lg">
                                            {coin.name} ({coin.symbol.toUpperCase()})
                                        </h2>
                                        <p>💵 Price: ${coin.current_price.toFixed(2)}</p>
                                        <p>📈 Market Cap: ${coin.market_cap.toLocaleString()}</p>
                                        <p
                                            className={
                                                coin.price_change_percentage_24h > 0
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            }
                                        >
                                            24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 border rounded bg-gray-100 dark:bg-gray-800">
                        <p>📉 Price Difference: ${result.diff.toFixed(2)}</p>
                        <p>📊 Price Ratio: {result.ratio.toFixed(2)}</p>
                    </div>
                </>
            )}
        </div>
    );
}
