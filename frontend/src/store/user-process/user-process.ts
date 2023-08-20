import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserProcess } from '../../types/state';
import { NameSpace } from '../../const';
import { UserFormRegister } from '../../types/user';
import { TrainingQtt } from '../../common/constant';

const initialState = {
  registringUser: null,
  isEdit: false,
  listPageNumber: 1,
  listLimit: TrainingQtt.Max,
  listSortingAscType: true,
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
    resetPaging: (state) => {
      state.listSortingAscType = true;
      state.listPageNumber = 1;
      state.listLimit = TrainingQtt.Max;
    },
    getNextPage: (state) => {
      state.listPageNumber++;
    },
    getLastPage: (state) => {
      state.listPageNumber--;
    },
    changeListLimit: (state, actions: PayloadAction<number>) => {
      state.listLimit = actions.payload;
    },
    changeSorting: (state) => {
      state.listSortingAscType = !state.listSortingAscType;
    },
  },
});

export const {
  createUserGeneral,
  setToEdit,
  resetPaging,
  getNextPage,
  getLastPage,
  changeListLimit,
  changeSorting,
} = userProcess.actions;

export default userProcess.reducer;
