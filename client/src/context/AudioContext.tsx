import React, { useContext, useRef, useState } from 'react';
import useBoolean from '../hooks/useBoolean';

interface ContextState {
  openPlayer: boolean;
  handleOpenPlayer: () => void;
  handleClosePlayer: () => void;
  openQueue: boolean;
  handleToggleQueue: () => void;
  handleCloseQueue: () => void;
  playerRef: React.RefObject<HTMLDivElement>;
}

const AudioContext = React.createContext<ContextState>({} as ContextState);

const AudioContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    value: openPlayer,
    setTrue: handleOpenPlayer,
    setFalse: handleClosePlayer,
  } = useBoolean(false);
  const {
    value: openQueue,
    setFalse: handleCloseQueue,
    toggle: handleToggleQueue,
  } = useBoolean(false);

  const playerRef = useRef<HTMLDivElement>(null);

  return (
    <AudioContext.Provider
      value={{
        openPlayer,
        handleOpenPlayer,
        handleClosePlayer,
        openQueue,
        handleToggleQueue,
        handleCloseQueue,
        playerRef,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContextProvider;
export const useAudioContext = () => useContext(AudioContext);
