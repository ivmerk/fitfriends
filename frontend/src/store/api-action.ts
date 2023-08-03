import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../const';
import { UserData } from '../types/user-data';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { TokenData } from '../types/token-data';

export const checkAuthAction = createAsyncThunk<
  UserData | null,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});

export const logInAction = createAsyncThunk<
  string,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ login: email, password }, { extra: api }) => {
  const { data } = await api.post<TokenData>(APIRoute.Login, {
    email,
    password,
  });
  saveToken(data.accessToken);
  return data.refreshToken;
});

export const logOutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
