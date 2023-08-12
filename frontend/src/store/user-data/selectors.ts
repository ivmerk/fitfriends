import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { User } from '../../types/user';
import { UserRole } from '../../types/user-role.enum';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.Data].authorizationStatus;
export const getIsLoadingComplete = (state: State): boolean =>
  state[NameSpace.Data].isLoadingComplete;
export const getLoggedUserRole = (state: State): UserRole | null =>
  state[NameSpace.Data].loggedUserRole;
export const getLoggedUserId = (state: State): number | null =>
  state[NameSpace.Data].loggedUserId;
export const getLoggedUser = (state: State): User | null =>
  state[NameSpace.Data].loggedUser;
