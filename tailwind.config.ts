import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0a0e1a", // Deep Navy
                foreground: "#e8e0c9", // Parchment
                primary: "#b8860b",   // Gold
                secondary: "#b87333", // Copper
                accent: "#1a1429",    // Dark Purple
            },
            fontFamily: {
                serif: ["var(--font-crimson-text)", "serif"],
                display: ["var(--font-cinzel)", "serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
