import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContex';

const RequireAuth = () => {
  const { isLogged } = useContext(AuthContext);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default RequireAuth;