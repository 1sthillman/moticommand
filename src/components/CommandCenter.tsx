"use client";

import { Search, Filter, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface CommandCenterProps {
    categories: { id: string; name: string; symbol: string }[];
    selectedCategory: string | null;
    onSelectCategory: (id: string | null) => void;
    onSearch: (term: string) => void;
}

export function CommandCenter({ categories, selectedCategory, onSelectCategory, onSearch }: CommandCenterProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="sticky top-4 z-50 w-full mb-8">
            <div className="relative mx-auto max-w-2xl">
                <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl shadow-black/50"></div>
                <div className="relative p-2 flex flex-col gap-2">

                    {/* Search Bar */}
                    <div className="flex items-center px-4 py-2 gap-3">
                        <Search className="text-secondary w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Arşivde ara... (ör. 'Yalnızlık', 'İstifa')"
                            className="bg-transparent border-none outline-none text-foreground placeholder:text-foreground/30 flex-1 font-serif text-lg h-10"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`p-2 rounded-lg transition-colors ${isExpanded ? 'bg-primary text-background' : 'text-primary hover:bg-primary/10'}`}
                        >
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Filter Drawer */}
                    {isExpanded && (
                        <div className="border-t border-primary/10 p-4 animate-in slide-in-from-top-2 fade-in">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs uppercase tracking-widest text-secondary">Kategoriler</span>
                                {selectedCategory && (
                                    <button
                                        onClick={() => onSelectCategory(null)}
                                        className="text-xs text-red-400 flex items-center gap-1 hover:underline"
                                    >
                                        <X size={12} /> Temizle
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => onSelectCategory(cat.id === selectedCategory ? null : cat.id)}
                                    >
                                        <Badge
                                            variant={selectedCategory === cat.id ? "default" : "outline"}
                                            className="px-3 py-1.5 cursor-pointer text-sm hover:border-primary/50 transition-all"
                                        >
                                            {cat.symbol} {cat.name}
                                        </Badge>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
