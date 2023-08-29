import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../common/const';
import { TrainingData } from '../../types/state';
import {
  createTraining,
  getOrderedListOfTraining,
  getRecomendationTrainings,
  getTrainerTrainingList,
  getTrainingListForUserFromTrainerWithId,
} from '../api-action';

const initialState: TrainingData = {
  trainerTrainingList: [],
  isLoadingComplete: true,
  trainerOrderedTrainingList: [],
  recomendatedTrainingList: [],
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
      })
      .addCase(getTrainingListForUserFromTrainerWithId.pending, (state) => {
        state.isLoadingComplete = false;
      })
      .addCase(
        getTrainingListForUserFromTrainerWithId.fulfilled,
        (state, actions) => {
          state.isLoadingComplete = true;
          state.trainerTrainingList = Object.values(actions.payload);
        }
      )
      .addCase(getOrderedListOfTraining.pending, (state) => {
        state.isLoadingComplete = false;
      })
      .addCase(getOrderedListOfTraining.fulfilled, (state, actions) => {
        state.isLoadingComplete = true;
        state.trainerOrderedTrainingList = Object.values(actions.payload);
      })
      .addCase(getRecomendationTrainings.pending, (state) => {
        state.isLoadingComplete = false;
      })
      .addCase(getRecomendationTrainings.fulfilled, (state, actions) => {
        state.isLoadingComplete = true;
        state.recomendatedTrainingList = Object.values(actions.payload);
      });
  },
});
