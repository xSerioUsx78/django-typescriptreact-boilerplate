import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthInterface, LoginInterface } from '../../interfaces/auth';
import { authAxios } from '../../utils/axios';
import { serverError_500 } from '../../utils/communErrors';
import { throwToastError } from '../../utils/messages';
import requests from '../../utils/requests';


const initialState: AuthInterface = {
  isAuthenticated: false,
  isLoading: false,
  token: localStorage.getItem('token'),
  user: null
};

export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (arg, {getState}: any) => {
    const state = getState();
    const { token } = state.auth;
    const response = await authAxios(token).get(requests.getUser);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: LoginInterface) => {
    try {
      const response = await axios.post(requests.login, data);
      return response.data;
    } catch(e: any) {
      if (e.response.status === 400) {
        throwToastError(e.response.data.non_field_errors[0]);
      } else {
        throwToastError(serverError_500);
      };
      throw e;
    };
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (arg, {getState}: any) => {
    const state = getState();
    const { token } = state.auth;
    const response = await authAxios(token).post(requests.logout, {});
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Load user action handling
    builder.addCase(loadUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(loadUser.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    });

    // Login user action handling
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    });

    // Logout user action handling
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      localStorage.removeItem('token');
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      localStorage.removeItem('token');
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    });
  }
});