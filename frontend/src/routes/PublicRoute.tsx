import { Navigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
}

export default function PublicRoute({
  children,
}: Props) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}