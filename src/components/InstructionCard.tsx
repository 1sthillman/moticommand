"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Instruction } from "@/lib/types";

interface InstructionCardProps {
    instruction: Instruction;
    categoryName: string;
}

export function InstructionCard({ instruction, categoryName }: InstructionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="h-full"
        >
            <Card className="h-full flex flex-col justify-between border border-white/5 bg-black/40 backdrop-blur-md shadow-2xl hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] hover:border-primary/30 transition-all duration-500 overflow-hidden group">

                {/* Decorative Top Accent */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2">
                            <Badge variant="outline" className="border-primary/20 text-primary/80 tracking-widest text-[10px] uppercase bg-primary/5">
                                {categoryName}
                            </Badge>
                            {instruction.warning && (
                                <Badge variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20 text-[10px]">
                                    UYARI
                                </Badge>
                            )}
                        </div>
                        <span className="text-[10px] text-foreground/30 font-mono tracking-wider tabular-nums">
                            AGE: {instruction.ageRange}
                        </span>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-display text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                        {instruction.title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 pt-4">
                    <div className="space-y-4">
                        {instruction.steps.map((step, i) => (
                            <div key={i} className="flex gap-4 group/step">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-xs text-foreground/40 font-mono group-hover/step:border-primary/50 group-hover/step:text-primary transition-colors">
                                    {i + 1}
                                </span>
                                <p className="text-sm md:text-base text-foreground/80 font-serif leading-relaxed group-hover/step:text-foreground transition-colors">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>

                    {instruction.warning && (
                        <div className="mt-8 p-4 bg-red-500/5 border-l-2 border-red-500/40 rounded-r-lg">
                            <p className="text-xs md:text-sm text-red-200/90 italic font-serif leading-relaxed">
                                <span className="font-bold not-italic text-red-400 block mb-1 text-[10px] uppercase tracking-widest">Kritik Not</span>
                                {instruction.warning}
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="pt-6 border-t border-white/5 bg-white/[0.02] flex justify-between items-center text-xs text-foreground/40 font-medium">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 hover:text-green-400 transition-colors cursor-help" title="Deneyimleyenler">
                            <Heart size={12} className="text-green-500/50" /> {instruction.experienced}
                        </span>
                        <span className="flex items-center gap-1.5 hover:text-amber-400 transition-colors" title="Geç Öğrenenler">
                            <span className="w-2 h-2 rounded-full bg-amber-500/50"></span> {instruction.lateLearned}
                        </span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                        <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-foreground/60 hover:text-foreground relative">
                            <Copy size={14} />
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
