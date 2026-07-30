import type { Category } from "./category";

export interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
  categoryId: number;
  category: Category;
}