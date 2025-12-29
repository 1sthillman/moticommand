export interface Category {
    id: string;
    name: string;
    symbol: string;
    description: string;
}

export interface Instruction {
    id: string;
    category: string;
    title: string;
    ageRange: string;
    steps: string[];
    experienced: number;
    lateLearned: number;
    stillLearning: number;
    warning?: string;
}

export interface Contradiction {
    id: string;
    left: { instruction: string; category: string };
    right: { instruction: string; category: string };
}

export interface DB {
    categories: Category[];
    instructions: Instruction[];
    contradictions: Contradiction[];
}
