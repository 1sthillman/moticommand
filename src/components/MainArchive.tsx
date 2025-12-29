"use client";

import { useState, useMemo } from "react";
import { Instruction, Category } from "@/lib/types";
import { CommandCenter } from "./CommandCenter";
import { InstructionCard } from "./InstructionCard";
import { Badge } from "./ui/badge";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface MainArchiveProps {
    initialInstructions: Instruction[];
    categories: Category[];
}

export function MainArchive({ initialInstructions, categories }: MainArchiveProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 24;

    const filteredInstructions = useMemo(() => {
        return initialInstructions.filter(inst => {
            const matchesCategory = selectedCategory ? inst.category === selectedCategory : true;
            const matchesSearch = searchTerm
                ? inst.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                inst.steps.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
                : true;
            return matchesCategory && matchesSearch;
        });
    }, [initialInstructions, selectedCategory, searchTerm]);

    const visibleInstructions = useMemo(() => {
        return filteredInstructions.slice(0, page * ITEMS_PER_PAGE);
    }, [filteredInstructions, page]);

    const hasMore = visibleInstructions.length < filteredInstructions.length;

    return (
        <div className="relative z-10 container mx-auto px-4 pb-20">

            <CommandCenter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(id) => { setSelectedCategory(id); setPage(1); }}
                onSearch={(term) => { setSearchTerm(term); setPage(1); }}
            />

            <div className="mb-8 flex flex-col md:flex-row justify-between items-end px-4 gap-4">
                <div className="text-xs text-foreground/40 font-mono">
                    GÖSTERİLEN: {visibleInstructions.length} / {filteredInstructions.length} KAYIT
                </div>
                <Link href="/motivasyon" className="w-full md:w-auto text-center px-6 py-3 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary font-bold tracking-widest text-xs rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(184,134,11,0.1)] group">
                    <span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                        ✨ GÜNLÜK DOZ AL <span className="opacity-50">→</span>
                    </span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleInstructions.map((inst) => (
                    <InstructionCard
                        key={inst.id}
                        instruction={inst}
                        categoryName={categories.find(c => c.id === inst.category)?.name || "Bilinmiyor"}
                    />
                ))}
            </div>

            {filteredInstructions.length === 0 && (
                <div className="text-center py-20 opacity-50">
                    <h2 className="text-2xl font-serif mb-2">Hiçbir şey bulunamadı.</h2>
                    <p>Belki de bu cevap henüz yaşanmamıştır.</p>
                </div>
            )}

            {hasMore && (
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setPage(page + 1)}
                        className="group relative px-8 py-3 overflow-hidden rounded-full bg-primary/10 hover:bg-primary/20 transition-all font-display text-primary tracking-widest text-sm"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            DAHA FAZLA YÜKLE <Loader2 className="w-3 h-3 animate-spin hidden group-hover:block" />
                        </span>
                        <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-primary/5"></div>
                    </button>
                </div>
            )}
        </div>
    );
}
