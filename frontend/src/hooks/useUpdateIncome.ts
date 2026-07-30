import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateIncome } from '../api/incomes';

export function useUpdateIncome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: any) => updateIncome(id, data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['income'],
      });
    },
  });
}