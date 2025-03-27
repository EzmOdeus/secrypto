'use client';

import { useEffect, useState } from 'react';

type Coin = {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    image: string;
};

export default function ConvertPage() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [fromCoin, setFromCoin] = useState('');
    const [toCoin, setToCoin] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [converted, setConverted] = useState<number | null>(null);
    const [coinFrom, setCoinFrom] = useState<Coin | null>(null);
    const [coinTo, setCoinTo] = useState<Coin | null>(null);

    useEffect(() => {
        fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        )
            .then((res) => res.json())
            .then((data) => setCoins(data));
    }, []);

    const handleConvert = () => {
        const coinA = coins.find((c) => c.id === fromCoin) || null;
        const coinB = coins.find((c) => c.id === toCoin) || null;

        if (coinA?.current_price && coinB?.current_price && amount > 0) {
            const result = (amount * coinA.current_price) / coinB.current_price;
            setConverted(result);
            setCoinFrom(coinA);
            setCoinTo(coinB);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">💱 Convert Cryptocurrencies</h1>

            <div className="flex flex-col sm:flex-row gap-4">
                <select
                    value={fromCoin}
                    onChange={(e) => setFromCoin(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="">From</option>
                    {coins.map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>

                <select
                    value={toCoin}
                    onChange={(e) => setToCoin(e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="">To</option>
                    {coins.map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>
            </div>

            <input
                type="number"
                value={amount || ''}
                onChange={(e) =>
                    setAmount(e.target.value === '' ? 0 : parseFloat(e.target.value))
                }
                placeholder="Enter amount"
                className="border p-2 rounded w-full mt-2"
            />


            <button
                onClick={handleConvert}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Convert
            </button>

            {converted && coinFrom && coinTo && (
                <>
                    <div className="mt-6 p-4 border rounded bg-gray-100 dark:bg-gray-800">
                        <p>
                            {amount} {coinFrom.symbol.toUpperCase()} = {converted.toFixed(4)}{' '}
                            {coinTo.symbol.toUpperCase()}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {[coinFrom, coinTo].map((coin) => (
                            <div key={coin.id} className="border p-4 rounded shadow bg-white dark:bg-gray-900">
                                <div className="flex items-center gap-4">
                                    <img src={coin.image} alt={coin.name} className="w-12 h-12" />
                                    <div>
                                        <h2 className="font-bold text-lg">
                                            {coin.name} ({coin.symbol.toUpperCase()})
                                        </h2>
                                        <p>💵 Price: ${coin.current_price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
