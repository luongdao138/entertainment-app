import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.history;

export const getHistorySongsSelector = createSelector(
  getRoot,
  (state) => state.song.data
);

export const getHistorySongsPaginationSelector = createSelector(
  getRoot,
  (state) => state.song.pagination
);
