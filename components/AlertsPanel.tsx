type Alert = {
    coin: string;
    targetPrice: number;
};

export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
    return (
        <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">🔔 Price Alerts</h2>
            <div className="space-y-2">
                {alerts.map((alert, idx) => (
                    <div key={idx} className="p-4 border rounded bg-yellow-100 dark:bg-yellow-900">
                        Alert: {alert.coin} → ${alert.targetPrice}
                    </div>
                ))}
            </div>
        </section>
    );
}
