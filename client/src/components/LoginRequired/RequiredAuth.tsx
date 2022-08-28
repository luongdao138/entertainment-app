import { replace } from 'formik';
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import appRoutes from '../../constants/appRoutes';
import { useAuthContext } from '../../context/AuthContext';

const RequiredAuth = () => {
  const { changeRedirectUrl, authUser, isLoadingUser, openAuthModal } =
    useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authUser && !isLoadingUser) {
      changeRedirectUrl(location.pathname);
      navigate(appRoutes.HOME, { replace: true });
      openAuthModal();
    }
  }, [authUser, isLoadingUser]);

  return <Outlet />;
};

export default RequiredAuth;
