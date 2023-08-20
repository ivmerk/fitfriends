import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TrainingData } from '../../types/state';
import { createTraining, getTrainerTrainingList } from '../api-action';

const initialState: TrainingData = {
  trainerTrainingList: [],
  isLoadingComplete: true,
};

export const trainingData = createSlice({
  name: NameSpace.Training,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createTraining.pending, (state) => {
        state.isLoadingComplete = false;
      })
      .addCase(createTraining.fulfilled, (state) => {
        state.isLoadingComplete = true;
      })
      .addCase(getTrainerTrainingList.pending, (state) => {
        state.isLoadingComplete = false;
      })
      .addCase(getTrainerTrainingList.fulfilled, (state, actions) => {
        state.isLoadingComplete = true;
        state.trainerTrainingList = Object.values(actions.payload);
      });
  },
});
