import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserData } from '../../types/state';
import {
  checkAuthAction,
  createUser,
  getUserById,
  logInAction,
  logOutAction,
  updateUser,
  uploadFileImg,
  uploadSertImg,
} from '../api-action';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  users: [],
  loggedUserId: null,
  loggedUserRole: null,
  isLoadingComplete: true,
  isLogingComplete: true,
  hasError: false,
  loggedUser: null,
  userAvatar: '',
  userSertificate: '',
};

export const userData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logInAction.pending, (state) => {
        state.isLogingComplete = false;
      })
      .addCase(logInAction.fulfilled, (state, actions) => {
        state.isLogingComplete = true;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.loggedUserRole = actions.payload.userRole;
        state.loggedUserId = actions.payload.sub;
      })
      .addCase(logInAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logOutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoadingComplete = false;
        state.hasError = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoadingComplete = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoadingComplete = false;
      })
      .addCase(updateUser.fulfilled, (state, actions) => {
        state.isLoadingComplete = true;
        state.loggedUser = actions.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoadingComplete = false;
      })
      .addCase(getUserById.fulfilled, (state, actions) => {
        state.isLoadingComplete = true;
        state.loggedUser = actions.payload;
      })
      .addCase(uploadFileImg.pending, (state) => {
        state.isLoadingComplete = false;
      })
      .addCase(uploadFileImg.fulfilled, (state, actions) => {
        state.isLoadingComplete = true;
        state.userAvatar = actions.payload;
      })
      .addCase(uploadSertImg.pending, (state) => {
        state.isLoadingComplete = false;
      })
      .addCase(uploadSertImg.fulfilled, (state, actions) => {
        state.isLoadingComplete = true;
        state.userSertificate = actions.payload;
      });
  },
});
