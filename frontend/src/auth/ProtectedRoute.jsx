import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}
