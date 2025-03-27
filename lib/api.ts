export async function getCoins() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
  );
  if (!res.ok) throw new Error("Failed to fetch coins");
  return res.json();
}

export async function getNews() {
  // عينة بيانات مؤقتة
  return [
    { title: "Bitcoin Hits $70k", url: "#", source: "CryptoNews" },
    { title: "Ethereum 2.0 Launch Near", url: "#", source: "ETH Daily" },
    { title: "Altcoins Rally", url: "#", source: "Market Watch" },
  ];
}
