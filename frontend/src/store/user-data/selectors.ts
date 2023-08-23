import { AuthorizationStatus, NameSpace } from '../../common/const';
import { PersonalOrderTraining } from '../../types/personal-order-training';
import { State } from '../../types/state';
import { User } from '../../types/user';
import { UserRole } from '../../types/user-role.enum';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.Data].authorizationStatus;
export const getIsLoadingComplete = (state: State): boolean =>
  state[NameSpace.Data].isLoadingComplete;
export const getIsLoggingComplete = (state: State): boolean =>
  state[NameSpace.Data].isLogingComplete;
export const getLoggedUserRole = (state: State): UserRole | null =>
  state[NameSpace.Data].loggedUserRole;
export const getLoggedUserId = (state: State): number | null =>
  state[NameSpace.Data].loggedUserId;
export const getLoggedUser = (state: State): User | null =>
  state[NameSpace.Data].loggedUser;
export const getAllTrainerSertificates = (state: State): string[] | undefined =>
  state[NameSpace.Data].loggedUser?.trainerBody?.sertificates;
export const getUserAvatar = (state: State): string =>
  state[NameSpace.Data].userAvatar;
export const getNewUserSertificate = (state: State): string =>
  state[NameSpace.Data].userSertificate;
export const getUserFriends = (state: State): User[] =>
  state[NameSpace.Data].userFriends;
export const getTrainingPersonalOrderList = (
  state: State
): PersonalOrderTraining[] => state[NameSpace.Data].personalTrainingOrders;
