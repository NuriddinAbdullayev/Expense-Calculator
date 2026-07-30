import api from './axios';

export async function getSummary() {
  const response = await api.get('/statistics/summary');
  return response.data;
}

export async function getCategoryStatistics() {
  const response = await api.get('/statistics/category');
  return response.data;
}

export async function getMonthlyStatistics() {
  const response = await api.get('/statistics/monthly');
  return response.data;
}