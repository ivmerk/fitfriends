import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { UserFormRegister } from '../../types/user';

const initialState = {
  registringUser: null,
} as UserProcess;

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    createUserGeneral: (state, action: PayloadAction<UserFormRegister>) => {
      state.registringUser = action.payload;
    },
  },
});

export const { createUserGeneral } = userProcess.actions;

export default userProcess.reducer;
