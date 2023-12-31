import { AuthorizationStatus, NameSpace } from '../../common/const';
import { PersonalOrderTraining } from '../../types/personal-order-training';
import { State } from '../../types/state';
import { User } from '../../types/user';
import { UserFriendData } from '../../types/user-friend-data';
import { UserRole } from '../../types/user-role.enum';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.Data].authorizationStatus;
export const getIsLoadingComplete = (state: State): boolean =>
  state[NameSpace.Data].isLoadingComplete;
export const getIsDeletingComplete = (state: State): boolean =>
  state[NameSpace.Data].isDeletingComplete;
export const getIsLoggingComplete = (state: State): boolean =>
  state[NameSpace.Data].isLogingComplete;
export const getLoggedUserRole = (state: State): UserRole | null =>
  state[NameSpace.Data].loggedUserRole;
export const getLoggedUserId = (state: State): number | null =>
  state[NameSpace.Data].loggedUserId;
export const getLoggedUser = (state: State): User | null =>
  state[NameSpace.Data].loggedUser;
export const getUserCard = (state: State): User | null =>
  state[NameSpace.Data].user;
export const getAllTrainerSertificates = (state: State): string[] | undefined =>
  state[NameSpace.Data].loggedUser?.trainerBody?.sertificates;
export const getUserAvatar = (state: State): string =>
  state[NameSpace.Data].userAvatar;
export const getNewUserSertificate = (state: State): string =>
  state[NameSpace.Data].userSertificate;
export const getUserFriends = (state: State): UserFriendData[] =>
  state[NameSpace.Data].userFriends;
export const getMyUserFriendsCards = (state: State): User[] =>
  state[NameSpace.Data].userMyFriendsCards;
export const getTrainingPersonalOrderList = (
  state: State
): PersonalOrderTraining[] => state[NameSpace.Data].personalTrainingOrders;
export const getUsers = (state: State): User[] =>
  state[NameSpace.Data].userList;
