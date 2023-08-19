import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userData } from './user-data/user-data';
import { userProcess } from './user-process/user-process';
import { trainingData } from './training-data/training-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: userData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Training]: trainingData.reducer,
});
