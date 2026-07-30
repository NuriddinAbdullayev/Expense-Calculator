import api from './axios';
import type { Income } from '../types/income';

export async function getIncomes() {
  const response = await api.get<Income[]>('/income');
  return response.data;
}

export async function createIncome(data: {
  source: string;
  amount: number;
  description?: string;
}) {
  const response = await api.post<Income>(
    '/income',
    data,
  );

  return response.data;
}

export async function updateIncome(
  id: number,
  data: {
    source: string;
    amount: number;
    description?: string;
  },
) {
  const response = await api.patch(
    `/income/${id}`,
    data,
  );

  return response.data;
}

export async function deleteIncome(id: number) {
  await api.delete(`/income/${id}`);
}