import { CalendarDays } from 'lucide-react';

export default function Topbar() {
  const today = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Welcome back
        </p>
      </div>

      <div className="flex items-center gap-2 text-gray-500">
        <CalendarDays size={18} />

        <span>{today}</span>
      </div>
    </header>
  );
}