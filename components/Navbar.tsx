'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="border-b p-4 bg-white dark:bg-gray-900 text-black dark:text-white sticky top-0 z-50 w-full">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="font-bold text-lg">
                    💰 Secrypto
                </Link>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-xl"
                >
                    ☰
                </button>

                {/* Links */}
                <div
                    className={`${menuOpen ? "flex fixed top-10" : "hidden"
                        } md:flex flex-col md:flex-row md:items-center gap-4 absolute md:static left-0 right-0 top-full md:top-auto bg-white dark:bg-gray-900 p-4 md:p-0 z-50 shadow md:shadow-none`}
                >
                    <Link href="/convert" onClick={() => setMenuOpen(false)}>
                        Convert
                    </Link>
                    <Link href="/compare" onClick={() => setMenuOpen(false)}>
                        Compare
                    </Link>
                    <Link href="/alerts" onClick={() => setMenuOpen(false)}>
                        Alerts
                    </Link>
                    <Link href="/favorites" onClick={() => setMenuOpen(false)}>
                        Favorites
                    </Link>

                    <ThemeToggle />

                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
}
