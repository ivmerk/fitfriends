import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Training } from '../../types/training';

export const getTrainingList = (state: State): Training[] =>
  state[NameSpace.Training].trainerTrainingList;

export const getIsLoadingTrainingComplete = (state: State): boolean =>
  state[NameSpace.Training].isLoadingComplete;
