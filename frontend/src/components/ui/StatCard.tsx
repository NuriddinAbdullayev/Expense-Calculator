import type { ReactNode } from 'react';
// import { formatCurrency } from '../../utils/formatCurrency';
import Money from './Money';

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {title}
        </span>

        {icon}
      </div>

      <h3 className="text-3xl font-bold tracking-tight">
        <Money amount={value} />
      </h3>
    </div>
  );
}