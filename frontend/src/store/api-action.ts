import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../const';
import { User, UserUpdateData } from '../types/user';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { TokenData } from '../types/token-data';
import { UserData } from '../types/user-data';
import { CreateUserData } from '../types/create-user-data';
import jwtDecode from 'jwt-decode';
import { MyToken } from '../types/my-token.interfafe';
import { Training } from '../types/training';
import { NewTrainingData } from '../types/new-training-data';

export const checkAuthAction = createAsyncThunk<
  number,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data.userId;
});

export const logInAction = createAsyncThunk<
  MyToken,
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
  return jwtDecode(data.accessToken);
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

export const createUser = createAsyncThunk<
  User,
  CreateUserData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/register', async (user, { extra: api }) => {
  const { data } = await api.post<User>(APIRoute.Register, user);
  return data;
});

export const updateUser = createAsyncThunk<
  User,
  UserUpdateData,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('user/update', async (user, { extra: api }) => {
  const { data } = await api.patch<User>(APIRoute.UpdateUser, user);
  return data;
});

export const getUserById = createAsyncThunk<
  User,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/getbyid', async (id, { extra: api }) => {
  const { data } = await api.get<User>(`${APIRoute.User}/${id}`);
  return data;
});

export const createTraining = createAsyncThunk<
  Training,
  NewTrainingData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('training/create', async (training, { extra: api }) => {
  const { data } = await api.post<Training>(APIRoute.TrainingCreate, training);
  return data;
});
