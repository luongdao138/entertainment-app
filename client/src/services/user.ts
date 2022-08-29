import apiEndpoints from '../constants/apiEndpoints';
import { privateClient } from './client';

export interface UpdateUserProfileParams {
  profile_photo?: string;
  address?: string;
  phone?: string;
  title?: string;
  date_of_birth?: Date;
  full_name?: string;
}

export interface ResetPasswordParams {
  password: string;
  new_password: string;
}

export interface UpdateUserProfileResponse {}

export const updateUserProfile = async (params: UpdateUserProfileParams) => {
  const res = await privateClient.put(apiEndpoints.UPDATE_PROFILE, params);
  return res.data;
};

export const resetPassword = async (params: ResetPasswordParams) => {
  const res = await privateClient.put(apiEndpoints.RESET_PASSWORD, params);
  return res.data;
};
