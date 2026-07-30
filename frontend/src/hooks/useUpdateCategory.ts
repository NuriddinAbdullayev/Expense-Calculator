import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { updateCategory } from '../api/categories';

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      name,
    }: {
      id: number;
      name: string;
    }) =>
      updateCategory(id, {
        name,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },

    onError: (error: AxiosError) => {
      alert(
        (error.response?.data as any)?.message ??
          'Failed to update category',
      );
    },
  });
}