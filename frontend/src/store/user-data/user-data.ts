import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserData } from '../../types/state';
import {
  checkAuthAction,
  createUser,
  logInAction,
  logOutAction,
  updateUser,
} from '../api-action';

const initialState: UserData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  users: [],
  loggedUser: null,
  isRegistringComplete: false,
  hasError: false,
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
      .addCase(logInAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logInAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logOutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(createUser.pending, (state) => {
        state.isRegistringComplete = false;
        state.hasError = false;
      })
      .addCase(createUser.fulfilled, (state, actions) => {
        state.isRegistringComplete = true;
        state.loggedUser = actions.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isRegistringComplete = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isRegistringComplete = true;
        state.loggedUser = action.payload;
      });
  },
});
