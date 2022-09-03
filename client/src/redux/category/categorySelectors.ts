import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const getRoot = (state: RootState) => state.category;

export const getAllCategoriesSelector = createSelector(
  getRoot,
  (state) => state.all
);
