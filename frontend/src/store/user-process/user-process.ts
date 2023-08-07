import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserProcess } from '../../types/state';
import { NameSpace } from '../../const';
import {
  UserFormRegister,
  UserFormRegisterDetailsClient,
} from '../../types/user';

const initialState = {
  registringUser: null,
  registringUserDetailsClient: null,
} as UserProcess;

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    createUserGeneral: (state, action: PayloadAction<UserFormRegister>) => {
      state.registringUser = action.payload;
    },
    createClientDetails: (
      state,
      action: PayloadAction<UserFormRegisterDetailsClient>
    ) => {
      state.registringUserDetailsClient = action.payload;
    },
  },
});

export const { createUserGeneral, createClientDetails } = userProcess.actions;

export default userProcess.reducer;
