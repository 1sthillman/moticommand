"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, RefreshCw, Quote } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { quotes } from "@/lib/quotes";

export default function MotivasyonPage() {
    const [currentQuote, setCurrentQuote] = useState(quotes[0]);
    const [key, setKey] = useState(0);

    const randomize = () => {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        setCurrentQuote(random);
        setKey(k => k + 1);
    };

    return (
        <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0e1a] to-black flex flex-col items-center justify-center p-8 relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full animate-pulse delay-1000"></div>
            </div>

            <div className="z-10 w-full max-w-4xl">
                <header className="flex justify-between items-center mb-16">
                    <Link href="/" className="text-foreground/60 hover:text-primary transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
                        ← Arşive Dön
                    </Link>
                    <Badge variant="gold" className="px-4 py-1 text-xs">GÜNLÜK DOZ</Badge>
                </header>

                <section className="text-center mb-20">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative"
                        >
                            <Quote className="absolute -top-12 -left-4 md:-left-12 w-24 h-24 text-primary/10 transform -scale-x-100" />
                            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 drop-shadow-2xl mb-8">
                                "{currentQuote.text}"
                            </h1>
                            <p className="text-xl text-primary/80 font-serif italic tracking-wide">
                                — {currentQuote.author}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <motion.div
                        className="mt-12 flex justify-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <button
                            onClick={randomize}
                            className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
                        >
                            <RefreshCw className="w-5 h-5 text-foreground/70 group-hover:rotate-180 transition-transform duration-700" />
                            <span className="text-sm font-bold tracking-widest text-foreground/90 uppercase">Yeni Bir Doz</span>
                        </button>
                    </motion.div>
                </section>

            </div>
        </main>
    );
}
