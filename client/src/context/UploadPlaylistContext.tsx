import React, { useContext, useState } from 'react';
import { Playlist } from '../services/playlist';

interface ContextState {
  isOpenUploadPlaylistForm: boolean;
  closeUploadPlaylistForm: () => void;
  openUploadPlaylistForm: () => void;
  isEdit: boolean;
  changeToEditMode: () => void;
  editedPlaylist: Playlist | null;
  setEditedPlaylist: React.Dispatch<React.SetStateAction<Playlist | null>>;
}

const UploadPlaylistContext = React.createContext<ContextState>(
  {} as ContextState
);

const UploadPlaylistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editedPlaylist, setEditedPlaylist] = useState<Playlist | null>(null);
  const [isOpenUploadPlaylistForm, setIsOpenUploadListForm] =
    useState<boolean>(false);
  const closeUploadPlaylistForm = () => {
    setIsEdit(false);
    setIsOpenUploadListForm(false);
  };

  const openUploadPlaylistForm = () => {
    setIsOpenUploadListForm(true);
  };

  const changeToEditMode = () => {
    setIsEdit(true);
  };

  return (
    <UploadPlaylistContext.Provider
      value={{
        closeUploadPlaylistForm,
        isOpenUploadPlaylistForm,
        openUploadPlaylistForm,
        changeToEditMode,
        isEdit,
        editedPlaylist,
        setEditedPlaylist,
      }}
    >
      {children}
    </UploadPlaylistContext.Provider>
  );
};

export default UploadPlaylistProvider;
export const useUploadPlaylistContext = () => useContext(UploadPlaylistContext);
