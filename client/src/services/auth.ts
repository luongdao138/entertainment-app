import apiEndpoints from '../constants/apiEndpoints';
import { client, privateClient } from './client';

export interface AuthUser {
  id: string;
  profile_photo: string;
  email: string;
  full_name: string;
  is_premium: boolean;
  is_verified: boolean;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: AuthUser;
  access_token: string;
}

export interface GetUserResponse {
  user: AuthUser;
}

export interface SignupParams extends LoginParams {
  full_name: string;
}

export interface SignupResponse {
  user: AuthUser;
}

export interface RefreshTokenResponse {
  access_token: string;
}

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const res = await client.post<LoginResponse>(apiEndpoints.LOGIN, params);

  return res.data;
};

export const signup = async (params: SignupParams): Promise<SignupResponse> => {
  const res = await client.post<SignupResponse>(apiEndpoints.SIGNUP, params);

  return res.data;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const res = await client.post<RefreshTokenResponse>(
    apiEndpoints.REFRESH_TOKEN
  );

  return res.data;
};

export const getUserInfo = async (): Promise<GetUserResponse> => {
  const res = await privateClient.get(apiEndpoints.GET_USER_INFO);
  return res.data;
};

export const logout = async (): Promise<void> => {
  const res = await client.post<void>(apiEndpoints.LOGOUT);

  return res.data;
};
