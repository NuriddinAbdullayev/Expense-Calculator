import type { Expense } from './expense';
import type { Income } from './income';

export interface Dashboard {
  balance: number;
  totalIncome: number;
  totalExpense: number;
  incomeCount: number;
  expenseCount: number;
  categoryCount: number;
  latestExpenses: Expense[];
  latestIncomes: Income[];
}