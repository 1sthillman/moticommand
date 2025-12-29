import { getDB } from "@/lib/api";
import { MainArchive } from "@/components/MainArchive";

// This is a Server Component, so it can use getDB (which uses fs)
export default function Home() {
    const db = getDB();

    return (
        <main className="min-h-screen bg-[url('/noise.png')] bg-fixed">
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}></div>

            {/* Header Area */}
            <div className="relative z-10 pt-20 pb-10 text-center px-4">
                <h1 className="font-display text-5xl md:text-7xl text-primary mb-2 tracking-widest drop-shadow-[0_0_15px_rgba(184,134,11,0.3)]">
                    İNSANLIĞIN HATALI TALİMATLARI
                </h1>
                <p className="text-xl text-foreground/60 font-serif italic max-w-2xl mx-auto">
                    "Binlerce yıllık deneyimin, kırık hayallerin ve sessiz kabullenişlerin dijital anıtı."
                </p>
            </div>

            <MainArchive
                initialInstructions={db.instructions}
                categories={db.categories}
            />

        </main>
    );
}
