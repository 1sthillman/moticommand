import db from '../../db.json';
import { Category, Instruction, Contradiction, DB } from './types';

// Cast the imported json to the specific DB type
const database = db as unknown as DB;

export const getDB = () => database;

export const getCategories = (): Category[] => database.categories;

export const getInstructions = (): Instruction[] => database.instructions;

export const getContradictions = (): Contradiction[] => database.contradictions;

export const getCategoryById = (id: string): Category | undefined =>
    database.categories.find(c => c.id === id);

export const getInstructionsByCategory = (categoryId: string): Instruction[] =>
    database.instructions.filter(i => i.category === categoryId);
