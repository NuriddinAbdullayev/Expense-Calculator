import api from './axios';
import type { Expense } from '../types/expense';

export async function getExpenses() {
  const response = await api.get<Expense[]>('/expenses');
  return response.data;
}

export async function createExpense(data: {
  amount: number;
  description: string;
  categoryId: number;
}) {
  const response = await api.post<Expense>(
    '/expenses',
    data,
  );

  return response.data;
}

export async function updateExpense(
  id: number,
  data: {
    amount: number;
    description: string;
    categoryId: number;
  },
) {
  const response = await api.patch(
    `/expenses/${id}`,
    data,
  );

  return response.data;
}

export async function deleteExpense(id: number) {
  await api.delete(`/expenses/${id}`);
}