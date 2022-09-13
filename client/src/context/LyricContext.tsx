import React, { useContext } from 'react';
import useBoolean from '../hooks/useBoolean';

interface ContextState {
  open_lyric: boolean;
  handleOpenLyric: () => void;
  handleCloseLyric: () => void;
}

const LyricContext = React.createContext<ContextState>({} as ContextState);

const LyricProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    value: open_lyric,
    setTrue: handleOpenLyric,
    setFalse: handleCloseLyric,
  } = useBoolean();
  return (
    <LyricContext.Provider
      value={{ handleCloseLyric, handleOpenLyric, open_lyric }}
    >
      {children}
    </LyricContext.Provider>
  );
};

export default LyricProvider;
export const useLyricContext = () => useContext(LyricContext);
