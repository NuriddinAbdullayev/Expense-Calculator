import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createIncome } from '../api/incomes';

export function useCreateIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIncome,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['income'],
      });
    },
  });
}