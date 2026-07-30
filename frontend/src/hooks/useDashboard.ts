import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getDashboard } from '../api/dashboard';
import type { Dashboard } from '../types/dashboard';

export function useDashboard() {
  return useQuery<Dashboard, AxiosError>({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  });
}