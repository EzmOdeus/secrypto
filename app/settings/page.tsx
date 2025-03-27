'use client';

import { useUser } from '@clerk/nextjs';

export default function SettingsPage() {
    const { user } = useUser();

    return (
        <main className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>

            <section className="mb-6">
                <h2 className="text-lg font-semibold mb-2">🌗 Theme</h2>
                {/* هنا يمكنك إضافة وظيفة تغيير السمة كما في المثال السابق */}
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-2">👤 Account</h2>
                {user ? (
                    <div className="space-y-2">
                        <p>
                            <strong>Name:</strong> {user.fullName}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
                        </p>
                        <p>
                            <strong>Username:</strong> {user.username}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-500">Not signed in</p>
                )}
            </section>
        </main>
    );
}
