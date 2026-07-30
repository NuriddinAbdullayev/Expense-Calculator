import api from './axios';
import type { Category } from '../types/category';

export async function getCategories() {
  const response = await api.get<Category[]>('/categories');
  return response.data;
}

export async function createCategory(data: {
  name: string;
}) {
  const response = await api.post<Category>(
    '/categories',
    data,
  );

  return response.data;
}

export async function updateCategory(
  id: number,
  data: {
    name: string;
  },
) {
  const response = await api.patch<Category>(
    `/categories/${id}`,
    data,
  );

  return response.data;
}

export async function deleteCategory(id: number) {
  await api.delete(`/categories/${id}`);
}