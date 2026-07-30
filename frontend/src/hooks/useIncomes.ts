import { useQuery } from '@tanstack/react-query';

import { getIncomes } from '../api/incomes';

export function useIncomes() {
  return useQuery({
    queryKey: ['income'],
    queryFn: getIncomes,
  });
}