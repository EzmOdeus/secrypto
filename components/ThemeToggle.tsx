"use client";

import { useTheme } from "../app/context/ThemeContext";

export function ThemeToggle() {
    const { theme, toggle } = useTheme();

    return (
        <button onClick={toggle} className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
    );
}
