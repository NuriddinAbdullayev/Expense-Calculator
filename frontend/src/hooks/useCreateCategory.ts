import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { createCategory } from '../api/categories';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },

    onError: (error: AxiosError) => {
      alert(
        (error.response?.data as any)?.message ??
          'Failed to create category',
      );
    },
  });
}