import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import Button from '../ui/Button';
import Input from '../ui/Input';

interface Props {
  initialValues?: {
    source: string;
    amount: number;
    description?: string;
  };

  loading?: boolean;

  onSubmit(data: any): void;
}

export default function IncomeForm({
  initialValues,
  loading,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <Input
        label="Source"
        {...register('source', {
          required: true,
        })}
      />

      <Input
        label="Amount"
        type="number"
        {...register('amount', {
          valueAsNumber: true,
        })}
      />

      <Input
        label="Description"
        {...register('description')}
      />

      <Button
        type="submit"
        disabled={loading}
      >
        Save
      </Button>
    </form>
  );
}