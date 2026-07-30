import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { deleteCategory } from '../api/categories';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },

    onError: (error: AxiosError) => {
      alert(
        (error.response?.data as any)?.message ??
          'Failed to delete category',
      );
    },
  });
}