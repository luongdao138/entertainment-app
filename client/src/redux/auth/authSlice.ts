import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthUser, LoginResponse } from '../../services/auth';
import { getUserInfo, updateProfile } from './authActions';

interface SliceState {
  user: AuthUser | null;
}

const initialState: SliceState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      state.user = action.payload.user;
    },
    logout(state) {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...(action.payload as AuthUser) };
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
