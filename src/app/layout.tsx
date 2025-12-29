import type { Metadata } from "next";
import { Cinzel, Crimson_Text } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"], variable: '--font-cinzel' });
const crimsonText = Crimson_Text({ subsets: ["latin"], weight: ["400", "600", "700"], variable: '--font-crimson-text' });

export const metadata: Metadata = {
    title: "İnsanlığın Hatalı Talimatları",
    description: "Mistik Bilgelik Arşivi",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <head>
                <link rel="manifest" href="/moticommand/manifest.json" />
                <meta name="theme-color" content="#B8860B" />
            </head>
            <body className={`${cinzel.variable} ${crimsonText.variable} font-serif bg-background text-foreground antialiased`}>{children}</body>
        </html>
    );
}
