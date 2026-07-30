import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  Wallet,
  Receipt,
  FolderOpen,
  ChartColumn,
  LogOut,
} from 'lucide-react';

import { useAuth } from '../../contexts/AuthContext';

const links = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Income',
    path: '/income',
    icon: Wallet,
  },
  {
    name: 'Expenses',
    path: '/expenses',
    icon: Receipt,
  },
  {
    name: 'Categories',
    path: '/categories',
    icon: FolderOpen,
  },
  {
    name: 'Statistics',
    path: '/statistics',
    icon: ChartColumn,
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-green-600">
          Expense Tracker
        </h1>
      </div>

      <nav className="flex-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          const active = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`mb-2 flex items-center gap-3 rounded-lg p-3 transition ${
                active
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />

              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />

          Logout
        </button>
      </div>
    </aside>
  );
}