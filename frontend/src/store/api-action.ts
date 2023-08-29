import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../common/const';
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
import { UploadedFile } from '../types/upload-file';
import { GetTrainingFeedQuery } from '../types/get-training-feed-query';
import {
  getPersonalTrainingOrderApprovingUrl,
  getListOfTrainingUrl,
  getTreinerListQuery,
  getListOfUsersUrl,
  getListOfTrainingForCatalogUrl,
} from '../common/geturl';
import { PersonalOrderTraining } from '../types/personal-order-training';
import { PersonalOrderTrainingStatusQuery } from '../types/personal-order-training-status.query';
import { TrainingListQuery } from '../types/training-list-query';
import { TrainingOrderFeed } from '../types/training-order-feed';
import { UserListFeedQuery } from '../types/users-list-feed.query';
import { UserFriendData } from '../types/user-friend-data';
import { PersonalOrderTrainingData } from '../types/personal-order-training-data';
import { TrainingListForCatalogQuery } from '../types/training-list-for-catalog-query';

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
  string,
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

export const getTrainerTrainingList = createAsyncThunk<
  Training[],
  GetTrainingFeedQuery,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'training/getByTreinerId',
  async (
    {
      durations,
      priceMin,
      priceMax,
      caloriesQttMin,
      caloriesQttMax,
      ratingMin,
      ratingMax,
      page,
      limit,
      priceSortType,
    },
    { extra: api }
  ) => {
    const { data } = await api.get<Training[]>(
      getTreinerListQuery(
        durations,
        priceMin,
        priceMax,
        caloriesQttMin,
        caloriesQttMax,
        ratingMin,
        ratingMax,
        page,
        limit,
        priceSortType
      )
    );
    return data;
  }
);

export const getTrainingListForUserFromTrainerWithId = createAsyncThunk<
  Training[],
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('training/getByTreinerIdForUser', async (trainerId, { extra: api }) => {
  const { data } = await api.get<Training[]>(
    `${APIRoute.TrainindFromTrainer}/${trainerId}`
  );
  return data;
});

export const getTrainingListForCatalog = createAsyncThunk<
  Training[],
  TrainingListForCatalogQuery,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'training/getlistforcatalog',
  async (
    {
      typesOfTraining,
      priceMin,
      priceMax,
      caloriesQttMin,
      caloriesQttMax,
      ratingMin,
      ratingMax,
      page,
      limit,
      priceSortType,
    },
    { extra: api }
  ) => {
    const { data } = await api.get<Training[]>(
      getListOfTrainingForCatalogUrl(
        typesOfTraining,
        priceMin,
        priceMax,
        caloriesQttMin,
        caloriesQttMax,
        ratingMin,
        ratingMax,
        page,
        limit,
        priceSortType
      )
    );
    return data;
  }
);

export const uploadFileImg = createAsyncThunk<
  string,
  File,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/uploadimg', async (file, { extra: api }) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post<UploadedFile>(APIRoute.UploadImg, formData, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
  return data.path;
});

export const uploadSertImg = createAsyncThunk<
  string,
  File,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/uploadsertimg', async (file, { extra: api }) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post<UploadedFile>(APIRoute.UploadImg, formData, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
  return data.path;
});

export const uploadFilePdf = createAsyncThunk<
  string,
  File,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/uploadpdf', async (file, { extra: api }) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post<UploadedFile>(APIRoute.UploadPdf, formData, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
  return data.path;
});

export const uploadFileVideo = createAsyncThunk<
  string,
  File,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/uploadvideo', async (file, { extra: api }) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post<UploadedFile>(
    APIRoute.UploadVideo,
    formData,
    {
      headers: { 'Content-type': 'multipart/form-data' },
    }
  );
  return data.path;
});

export const getFriends = createAsyncThunk<
  UserFriendData[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/getfriends', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserFriendData[]>(APIRoute.UserFriends);
  return data;
});

export const getMyFriendsCards = createAsyncThunk<
  User[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/getmyfriendscards', async (_arg, { extra: api }) => {
  const { data } = await api.get<User[]>(APIRoute.MyUserFriendsCards);
  return data;
});

export const addFriend = createAsyncThunk<
  UserFriendData,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/addfriend', async (id, { extra: api }) => {
  const { data } = await api.post<UserFriendData>(
    `${APIRoute.UserFriends}/${id}`
  );
  return data;
});

export const delFriend = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/delfriend', async (id, { extra: api }) => {
  await api.delete<void>(`${APIRoute.UserFriends}/${id}`);
});

export const getPersonalOrdersList = createAsyncThunk<
  PersonalOrderTraining[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('trainer/getpersonalrderlist', async (_arg, { extra: api }) => {
  const { data } = await api.get<PersonalOrderTraining[]>(
    APIRoute.UserPersonalOrder
  );
  return data;
});

export const getPersonalOrderAprooving = createAsyncThunk<
  PersonalOrderTraining[],
  PersonalOrderTrainingStatusQuery,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'trainer/getpersonalorderapprooving',
  async ({ orderId, newStatus }, { extra: api }) => {
    const { data } = await api.patch<PersonalOrderTraining[]>(
      getPersonalTrainingOrderApprovingUrl(orderId, newStatus)
    );
    return data;
  }
);

export const getOrderedListOfTraining = createAsyncThunk<
  TrainingOrderFeed[],
  TrainingListQuery,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'trainer/gettraininglist',
  async ({ trainingQttSortingType, totalMoneySortingType }, { extra: api }) => {
    const { data } = await api.get<TrainingOrderFeed[]>(
      getListOfTrainingUrl(trainingQttSortingType, totalMoneySortingType)
    );
    return data;
  }
);

export const getRecomendationTrainings = createAsyncThunk<
  Training[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/getrecomendations', async (_arg, { extra: api }) => {
  const { data } = await api.get<Training[]>(APIRoute.TrainingRecomendations);
  return data;
});

export const getUserList = createAsyncThunk<
  User[],
  UserListFeedQuery,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/getlist',
  async (
    { typesOfTraining, locations, levelOfExperience, page, limit },
    { extra: api }
  ) => {
    const { data } = await api.get<User[]>(
      getListOfUsersUrl(
        typesOfTraining,
        locations,
        levelOfExperience,
        page,
        limit
      )
    );
    return data;
  }
);

export const askPersonalTraining = createAsyncThunk<
  PersonalOrderTrainingData,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/askpersonaltraining', async (trainerId: string, { extra: api }) => {
  const { data } = await api.post<PersonalOrderTrainingData>(
    `${APIRoute.UserPersonalOrder}/${trainerId}`
  );
  return data;
});
