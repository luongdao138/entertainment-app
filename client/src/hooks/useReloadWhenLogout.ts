import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';

const useReloadWhenLogout = () => {
  const { authUser, isLoadingUser } = useAuthContext();

  // useEffect(() => {
  //   if (!authUser && !isLoadingUser) {
  //     //   console.log('unauthorized');
  //     window.location.reload();
  //   }
  // }, [authUser]);
};

export default useReloadWhenLogout;
