import { NameSpace } from '../../common/const';
import { State } from '../../types/state';
import { Training } from '../../types/training';
import { TrainingOrderFeed } from '../../types/training-order-feed';

export const getTrainingList = (state: State): Training[] =>
  state[NameSpace.Training].trainerTrainingList;

export const getIsLoadingTrainingComplete = (state: State): boolean =>
  state[NameSpace.Training].isLoadingComplete;

export const getOrderedTrainingList = (state: State): TrainingOrderFeed[] =>
  state[NameSpace.Training].trainerOrderedTrainingList;
