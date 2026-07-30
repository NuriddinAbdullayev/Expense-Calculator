import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getCategories } from '../api/categories';
import type { Category } from '../types/category';

export function useCategories() {
  return useQuery<Category[], AxiosError>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}