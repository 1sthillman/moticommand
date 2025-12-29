import fs from 'fs';
import path from 'path';
import { DB, Category, Instruction, Contradiction } from './types';

const dbPath = path.join(process.cwd(), 'db.json');

export async function getDB(): Promise<DB> {
    const fileContents = await fs.promises.readFile(dbPath, 'utf8');
    return JSON.parse(fileContents);
}

export async function getCategories(): Promise<Category[]> {
    const db = await getDB();
    return db.categories;
}

export async function getInstructionsByCategory(categoryId: string): Promise<Instruction[]> {
    const db = await getDB();
    return db.instructions.filter(inst => inst.category === categoryId);
}
