import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // ✅ switched to sessionStorage
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) return null; // Optional: replace with loader if you want

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
