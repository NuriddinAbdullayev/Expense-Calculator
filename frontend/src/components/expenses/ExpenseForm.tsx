import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../ui/Button';
import Input from '../ui/Input';

import { useCategories } from '../../hooks/useCategories';

interface ExpenseFormData {
  amount: number;
  description: string;
  categoryId: number;
}

interface Props {
  initialValues?: ExpenseFormData;
  loading?: boolean;
  onSubmit(data: ExpenseFormData): void;
}

export default function ExpenseForm({
  initialValues,
  loading,
  onSubmit,
}: Props) {
  const { data: categories } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ExpenseFormData>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
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

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Category
        </label>

        <select
          {...register('categoryId', {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="">
            Select category
          </option>

          {categories?.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        Save
      </Button>
    </form>
  );
}