import { getCoinDetails } from "@/lib/getCoinDetails";

type Params = {
    params: { id: string };
};

export default async function CoinDetailsPage({
    params,
}: {
    params: { id: string };
}) {
    const coin = await getCoinDetails(params.id); // ✅ دلوقتي صح

    if (!coin) {
        return <div className="p-6">Coin not found.</div>;
    }

    return (
    <section className="px-6 py-8 space-y-4">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <img src={coin.image.small} alt={coin.name} className="w-6 h-6" />
        {coin.name} ({coin.symbol.toUpperCase()})
      </h1>

      <p className="text-gray-600 text-lg">
        Current Price:{" "}
        <span className="font-semibold">
          ${coin.market_data.current_price.usd.toFixed(2)}
        </span>
      </p>

      <div className="prose max-w-none">
        <h2>About</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: coin.description.en?.split(".")[0] + ".",
          }}
        />
      </div>
    </section>
  );
}
