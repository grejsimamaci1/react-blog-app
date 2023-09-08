// import { createSlice } from '@reduxjs/toolkit';

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   photo: string;
//   accountPlan: string;
// }

// export interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
// }

// export const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.isAuthenticated = true;
//       state.user = action.payload;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;

// export default authSlice.reducer;

//token based
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      state.user = action.payload;
      state.token = action.payload.token;
    },
    logout: (state) => {
      console.log('User is logging out');
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
