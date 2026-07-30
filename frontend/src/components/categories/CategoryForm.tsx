import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../ui/Button';
import Input from '../ui/Input';

interface FormData {
  name: string;
}

interface Props {
  initialName?: string;
  loading?: boolean;
  onSubmit: (data: FormData) => void;
}

export default function CategoryForm({
  initialName = '',
  loading = false,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: initialName,
    },
  });

  useEffect(() => {
    reset({
      name: initialName,
    });
  }, [initialName, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Input
        label="Category Name"
        {...register('name', {
          required: true,
        })}
      />

      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
}