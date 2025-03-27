export function NewsSection({ articles }: { articles: any[] }) {
    return (
        <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">📰 Latest News</h2>
            <div className="space-y-4">
                {articles.map((a, i) => (
                    <a
                        key={i}
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border p-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        <h3 className="font-bold">{a.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{a.source}</p>
                    </a>
                ))}
            </div>
        </section>
    );
}
