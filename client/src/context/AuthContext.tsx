import React, { startTransition, useContext, useState } from 'react';
import useBoolean from '../hooks/useBoolean';
import { useAppSelector } from '../redux/hooks';
import { getAccessToken, getAuthUser } from '../redux/auth/authSelectors';
import { AuthUser } from '../services/auth';

interface ContextState {
  isOpenAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  changeRedirectUrl: (url: string | null) => void;
  changeAuthType: (type: AuthType) => void;
  authType: AuthType;
  redirectUrl: string | null;
  authUser: AuthUser | null;
  access_token: string | null;
  isLoadingUser: boolean;
  setIsLoadingUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<ContextState>({} as ContextState);

type AuthType = 'login' | 'signup';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authType, setAuthType] = useState<AuthType>('login');
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const { value: isOpenAuthModal, setTrue, setFalse } = useBoolean();

  const changeAuthType = (type: AuthType) => setAuthType(type);
  const changeRedirectUrl = (url: string | null) => setRedirectUrl(url);

  const openAuthModal = () => {
    startTransition(() => {
      setAuthType('login');
    });
    setTrue();
  };

  const closeAuthModal = () => {
    changeRedirectUrl(null);
    setFalse();
  };

  const authUser = useAppSelector(getAuthUser);
  const access_token = useAppSelector(getAccessToken);

  return (
    <AuthContext.Provider
      value={{
        openAuthModal,
        closeAuthModal,
        authType,
        changeAuthType,
        changeRedirectUrl,
        isOpenAuthModal,
        redirectUrl,
        access_token,
        authUser,
        isLoadingUser,
        setIsLoadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuthContext = () => useContext(AuthContext);
