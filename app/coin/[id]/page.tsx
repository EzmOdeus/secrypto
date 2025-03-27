import { notFound } from "next/navigation";

export default async function CoinDetail({ params }: { params: { id: string } }) {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${params.id}`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) return notFound();

    const coin = await res.json();

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">{coin.name}</h1>
                <img src={coin.image.large} alt={coin.name} className="w-20 h-20" />
            </div>

            <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: coin.description.en.split(".")[0] + "." }} />

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">التفاصيل</h2>
                <p><strong>الرمز:</strong> {coin.symbol.toUpperCase()}</p>
                <p><strong>السعر الحالي:</strong> ${coin.market_data.current_price.usd.toFixed(2)}</p>
                <p><strong>التغير خلال 24 ساعة:</strong> {coin.market_data.price_change_percentage_24h.toFixed(2)}%</p>
            </div>
        </main>
    );
}
