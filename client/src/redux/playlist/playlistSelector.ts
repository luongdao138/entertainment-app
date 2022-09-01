import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.playlist;

export const getPrivatePlaylist = createSelector(
  getRoot,
  (state) => state.private.data
);

export const getLibraryPlaylist = createSelector(
  getRoot,
  (state) => state.library.data
);
