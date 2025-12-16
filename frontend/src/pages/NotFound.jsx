import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-indigo-500">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-white">
          Page not found
        </h2>

        <p className="mt-2 text-slate-400">
          Sorry, the page you’re looking for doesn’t exist or was moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md bg-slate-700 text-white hover:bg-slate-600 transition"
          >
            Go back
          </button>

          <button
            onClick={() => {
              {user.role === "admin" && navigate('/dashboard/admin')}
              {user.role === "client" && navigate('/dashboard/client')}
            }}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound