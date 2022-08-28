import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.auth;

export const getAuthUser = createSelector(getRoot, (state) => state.user);
export const getAccessToken = createSelector(
  getRoot,
  (state) => state.access_token
);
