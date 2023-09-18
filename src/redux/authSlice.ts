import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  photo: string;
  accountPlan: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem('accessToken');
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    resetState: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
});

export const { login, logout, resetState } = authSlice.actions;

export default authSlice.reducer;

