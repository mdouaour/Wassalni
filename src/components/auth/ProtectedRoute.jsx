import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, profile, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && profile?.role !== requiredRole && profile?.role !== 'admin') {
    return <Navigate to="/rides" replace />;
  }

  return children;
}
