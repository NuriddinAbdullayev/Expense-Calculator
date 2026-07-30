import { useState } from 'react';

import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Spinner from '../../components/ui/Spinner';
import ErrorMessage from '../../components/ui/ErrorMessage';

import CategoryForm from '../../components/categories/CategoryForm';
import CategoryTable from '../../components/categories/CategoryTable';

import { useCategories } from '../../hooks/useCategories';
import { useCreateCategory } from '../../hooks/useCreateCategory';
import { useUpdateCategory } from '../../hooks/useUpdateCategory';
import { useDeleteCategory } from '../../hooks/useDeleteCategory';

import type { Category } from '../../types/category';

export default function Categories() {
  const { data, isLoading, error } = useCategories();

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] =
    useState<Category | null>(null);

  function handleCreate() {
    setSelected(null);
    setOpen(true);
  }

  function handleEdit(category: Category) {
    setSelected(category);
    setOpen(true);
  }

  function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      'Delete this category?',
    );

    if (!confirmDelete) {
      return;
    }

    deleteCategory.mutate(id);
  }

  function handleSubmit(data: {
    name: string;
  }) {
    if (selected) {
      updateCategory.mutate(
        {
          id: selected.id,
          name: data.name,
        },
        {
          onSuccess: () => {
            setOpen(false);
            setSelected(null);
          },
        },
      );

      return;
    }

    createCategory.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <ErrorMessage />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <Button onClick={handleCreate}>
            Add Category
          </Button>
        </div>

        <CategoryTable
          categories={data ?? []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelected(null);
          }}
          title={
            selected
              ? 'Edit Category'
              : 'New Category'
          }
        >
          <CategoryForm
            initialName={selected?.name}
            loading={
              createCategory.isPending ||
              updateCategory.isPending
            }
            onSubmit={handleSubmit}
          />
        </Modal>
      </div>
    </Layout>
  );
}