import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { UserFormRegister } from '../../types/user';

const initialState = {
  registringUser: null,
  isEdit: false,
} as UserProcess;

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    createUserGeneral: (state, actions: PayloadAction<UserFormRegister>) => {
      state.registringUser = actions.payload;
    },
    setToEdit: (state, actions: PayloadAction<boolean>) => {
      state.isEdit = actions.payload;
    },
  },
});

export const { createUserGeneral, setToEdit } = userProcess.actions;

export default userProcess.reducer;
