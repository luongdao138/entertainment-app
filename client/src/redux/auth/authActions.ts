import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../../services/auth';
import { AUTH_ACTION_TYPES } from './authTypes';
import * as services from '../../services/auth';
import { logout } from './authSlice';
import {
  resetPassword,
  ResetPasswordParams,
  updateUserProfile,
  UpdateUserProfileParams,
} from '../../services/user';
import { toast } from 'react-toastify';

export const getUserInfo = createAsyncThunk<services.GetUserResponse, void>(
  AUTH_ACTION_TYPES.GET_USER_INFO,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      const res = await services.getUserInfo();
      return res;
    } catch (error: any) {
      console.log(error.response);
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

export const logoutUser = createAsyncThunk<void, void>(
  AUTH_ACTION_TYPES.LOG_OUT,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await services.logout();
      localStorage.removeItem('music_token');
      dispatch(logout());
    } catch (error) {
      console.log(error);
      return rejectWithValue('Can not logout');
    }
  }
);

export const updateProfile = createAsyncThunk<
  UpdateUserProfileParams,
  UpdateUserProfileParams
>(
  AUTH_ACTION_TYPES.UPDATE_PROFILE,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      await updateUserProfile(params);
      return params;
    } catch (error: any) {
      console.log(error.response);
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

export const resetUserPassword = createAsyncThunk<void, ResetPasswordParams>(
  AUTH_ACTION_TYPES.RESET_PASSWORD,
  async (params, { rejectWithValue, dispatch }) => {
    try {
      await resetPassword(params);
      toast.success('Đổi mật khẩu thành công');
    } catch (error: any) {
      console.log(error.response);
      if (error.response?.status === 403) {
        localStorage.removeItem('music_token');
        dispatch(logout());
      }
      toast.error(error.response.data.msg || 'Đổi mật khẩu thất bại');
      return rejectWithValue(
        error.response?.data?.msg || 'Something went wrong!'
      );
    }
  }
);
