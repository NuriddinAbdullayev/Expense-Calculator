import Layout from '../../components/layout/Layout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';

import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  PiggyBank,
} from 'lucide-react';

import { useDashboard } from '../../hooks/useDashboard';
import Money from '../../components/ui/Money';
import Spinner from '../../components/ui/Spinner';
import ErrorMessage from '../../components/ui/ErrorMessage';

export default function Dashboard() {
  const { data, isLoading, error } = useDashboard();

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

  if (!data) {
    return (
      <Layout>
        <p>No data.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Balance"
          value={data.balance}
          icon={<Wallet size={20} />}
        />

        <StatCard
          title="Income"
          value={data.totalIncome}
          icon={<ArrowDownCircle size={20} />}
        />

        <StatCard
          title="Expenses"
          value={data.totalExpense}
          icon={<ArrowUpCircle size={20} />}
        />

        <StatCard
          title="Savings"
          value={data.balance}
          icon={<PiggyBank size={20} />}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card title="Recent Expenses">
            {data.latestExpenses.length === 0 ? (
              <p className="text-gray-500">
                No expenses yet.
              </p>
            ) : (
              <div className="space-y-4">
                {data.latestExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">
                        {expense.description}
                      </p>

                      <p className="text-sm text-gray-500">
                        {expense.category.name}
                      </p>
                    </div>

                    <span className="font-semibold">
                      <Money amount={expense.amount} />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Recent Income">
            {data.latestIncomes.length === 0 ? (
              <p className="text-gray-500">
                No income yet.
              </p>
            ) : (
              <div className="space-y-4">
                {data.latestIncomes.map((income) => (
                  <div
                    key={income.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">
                        {income.source}
                      </p>

                      <p className="text-sm text-gray-500">
                        {income.description || '-'}
                      </p>
                    </div>

                    <span className="font-semibold">
                      <Money amount={income.amount} />
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
        
      </div>
    </Layout>
  );
}