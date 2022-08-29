import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import appRoutes from '../../constants/appRoutes';
import { useAuthContext } from '../../context/AuthContext';

const AlreadyAuth = () => {
  const { authUser, isLoadingUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser && !isLoadingUser) {
      navigate(appRoutes.HOME, { replace: true });
    }
  }, [authUser, isLoadingUser]);

  return <Outlet />;
};

export default AlreadyAuth;
