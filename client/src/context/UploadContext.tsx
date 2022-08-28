import React, { useContext, useState } from 'react';

interface ContextState {
  isOpenUploadForm: boolean;
  closeUploadForm: () => void;
  openUploadForm: () => void;
}

const UploadContext = React.createContext<ContextState>({} as ContextState);

const UploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenUploadForm, setIsOpenUploadForm] = useState<boolean>(false);
  const closeUploadForm = () => {
    setIsOpenUploadForm(false);
  };

  const openUploadForm = () => {
    setIsOpenUploadForm(true);
  };
  return (
    <UploadContext.Provider
      value={{ closeUploadForm, isOpenUploadForm, openUploadForm }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadProvider;
export const useUploadContext = () => useContext(UploadContext);
