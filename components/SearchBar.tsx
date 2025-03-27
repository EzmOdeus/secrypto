"use client";

import { useState } from "react";

type Props = {
    onSearch: (term: string) => void;
};

export function SearchBar({ onSearch }: Props) {
    const [term, setTerm] = useState("");

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search coins..."
                className="w-full p-2 border rounded"
                value={term}
                onChange={(e) => {
                    setTerm(e.target.value);
                    onSearch(e.target.value);
                }}
            />
        </div>
    );
}
