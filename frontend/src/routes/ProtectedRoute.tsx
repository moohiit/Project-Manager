import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../app/store';
import type { JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((state: RootState) => state.auth as { user: unknown });
  // console.log("user protected:", user)
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
