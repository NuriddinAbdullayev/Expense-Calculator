import { useQueries } from '@tanstack/react-query';

import {
  getSummary,
  getCategoryStatistics,
  getMonthlyStatistics,
} from '../api/statistics';

export function useStatistics() {
  const [
    summary,
    categories,
    monthly,
  ] = useQueries({
    queries: [
      {
        queryKey: ['summary'],
        queryFn: getSummary,
      },
      {
        queryKey: ['category-statistics'],
        queryFn: getCategoryStatistics,
      },
      {
        queryKey: ['monthly-statistics'],
        queryFn: getMonthlyStatistics,
      },
    ],
  });

  return {
    summary,
    categories,
    monthly,
  };
}