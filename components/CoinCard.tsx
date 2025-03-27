import Link from "next/link";
import { useFavorites } from "@/app/context/FavoritesContext";

export function CoinCard({ id, name, symbol, price, image }: any) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.includes(id);

    return (
        <div className="relative border rounded p-4 bg-white dark:bg-gray-800 transition hover:shadow-md">
            <button
                onClick={() => toggleFavorite(id)}
                className="absolute top-2 right-2 text-yellow-500 text-xl"
                title="Toggle Favorite"
            >
                {isFavorite ? "★" : "☆"}
            </button>
            <Link href={`/dashboard/${id}`}>
                <img src={image} alt={name} className="w-12 h-12 mb-2" />
                <h2 className="font-semibold">{name}</h2>
                <p className="text-gray-500 uppercase text-sm">{symbol}</p>
                <p className="text-green-600 font-bold mt-2">${typeof price === 'number' ? price.toFixed(2) : 'N/A'}</p>
            </Link>
        </div>
    );
}
