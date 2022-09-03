import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as services from '../../services/category';
import { logout } from '../auth/authSlice';
import { CATEGORY_ACTION_TYPES } from './categoryTypes';

export const getAllCategoriesActions = createAsyncThunk<
  services.GetAllCategoryResponse,
  void
>(
  CATEGORY_ACTION_TYPES.GET_ALL_CATEGORIES,
  async (params, { rejectWithValue, dispatch, getState }) => {
    try {
      const res = await services.getAllCategories();
      return res;
    } catch (error: any) {
      toast.error(error.response?.data?.msg);
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
      return rejectWithValue(
        error.response?.data?.msg || 'Something went wrong!'
      );
    }
  }
);
