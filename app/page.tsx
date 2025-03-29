import { CoinList } from "@/components/CoinList";
import { NewsSection } from "@/components/NewsSection";
import {  getNews } from "@/lib/api";

export default async function HomePage() {
  const news = await getNews();

  return (
    <main className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🚀 Crypto Market Overview</h1>

      {/* أخبار */}
      <NewsSection articles={news} />

      {/* قائمة العملات */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Top Coins </h2>
        <CoinList  />
      </section>
    </main>
  );
}
