import { useState } from 'react';

import Layout from '../../components/layout/Layout';
import Spinner from '../../components/ui/Spinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

import IncomeForm from '../../components/incomes/IncomeForm';
import IncomeTable from '../../components/incomes/IncomeTable';

import { useIncomes } from '../../hooks/useIncomes';
import { useCreateIncome } from '../../hooks/useCreateIncome';
import { useUpdateIncome } from '../../hooks/useUpdateIncome';
import { useDeleteIncome } from '../../hooks/useDeleteIncome';

export default function Incomes() {
  const { data, isLoading, error } = useIncomes();

  const createIncome = useCreateIncome();
  const updateIncome = useUpdateIncome();
  const deleteIncome = useDeleteIncome();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  function handleCreate() {
    setSelected(null);
    setOpen(true);
  }

  function handleEdit(income: any) {
    setSelected(income);
    setOpen(true);
  }

  function handleDelete(id: number) {
    if (!confirm('Delete this income?')) return;

    deleteIncome.mutate(id);
  }

  function handleSubmit(data: any) {
    if (selected) {
      updateIncome.mutate(
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

    createIncome.mutate(data, {
      onSuccess() {
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
            Income
          </h1>

          <Button onClick={handleCreate}>
            Add Income
          </Button>
        </div>

        <IncomeTable
          data={data ?? []}
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
              ? 'Edit Income'
              : 'New Income'
          }
        >
          <IncomeForm
            initialValues={selected}
            loading={
              createIncome.isPending ||
              updateIncome.isPending
            }
            onSubmit={handleSubmit}
          />
        </Modal>
      </div>
    </Layout>
  );
}