import { useState } from 'react';

import Layout from '../../components/layout/Layout';
import Spinner from '../../components/ui/Spinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

import ExpenseForm from '../../components/expenses/ExpenseForm';
import ExpenseTable from '../../components/expenses/ExpenseTable';

import { useExpenses } from '../../hooks/useExpenses';
import { useCreateExpense } from '../../hooks/useCreateExpense';
import { useUpdateExpense } from '../../hooks/useUpdateExpense';
import { useDeleteExpense } from '../../hooks/useDeleteExpense';

export default function Expenses() {
  const { data, isLoading, error } =
    useExpenses();

  const createExpense =
    useCreateExpense();

  const updateExpense =
    useUpdateExpense();

  const deleteExpense =
    useDeleteExpense();

  const [open, setOpen] =
    useState(false);

  const [selected, setSelected] =
    useState<any>(null);

  function handleSubmit(data: any) {
    if (selected) {
      updateExpense.mutate(
        {
          id: selected.id,
          ...data,
        },
        {
          onSuccess() {
            setOpen(false);
            setSelected(null);
          },
        },
      );

      return;
    }

    createExpense.mutate(data, {
      onSuccess() {
        setOpen(false);
      },
    });
  }

  if (isLoading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <ErrorMessage />
      </Layout>
    );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Expenses
          </h1>

          <Button
            onClick={() => {
              setSelected(null);
              setOpen(true);
            }}
          >
            Add Expense
          </Button>
        </div>

        <ExpenseTable
          data={data ?? []}
          onEdit={(expense: any) => {
            setSelected(expense);
            setOpen(true);
          }}
          onDelete={(id: number) => {
            if (
              confirm(
                'Delete this expense?',
              )
            ) {
              deleteExpense.mutate(id);
            }
          }}
        />

        <Modal
          open={open}
          title={
            selected
              ? 'Edit Expense'
              : 'New Expense'
          }
          onClose={() => {
            setOpen(false);
            setSelected(null);
          }}
        >
          <ExpenseForm
            initialValues={
              selected && {
                amount: selected.amount,
                description:
                  selected.description,
                categoryId:
                  selected.category.id,
              }
            }
            loading={
              createExpense.isPending ||
              updateExpense.isPending
            }
            onSubmit={handleSubmit}
          />
        </Modal>
      </div>
    </Layout>
  );
}