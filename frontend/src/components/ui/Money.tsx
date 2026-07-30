import { formatCurrency } from '../../utils/formatCurrency';

interface MoneyProps {
  amount: number | string;
  className?: string;
}

export default function Money({
  amount,
  className = '',
}: MoneyProps) {
  return (
    <span className={className}>
      {formatCurrency(Number(amount))}
    </span>
  );
}