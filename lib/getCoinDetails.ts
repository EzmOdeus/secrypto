export async function getCoinDetails(id: string) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
