import { AuthorizationStatus, NameSpace } from '../../const';
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
export const getUserAvatar = (state: State): string =>
  state[NameSpace.Data].userAvatar;
export const getNewUserSertificate = (state: State): string =>
  state[NameSpace.Data].userSertificate;
