import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserFormRegister } from '../../types/user';
import { UserRole } from '../../types/user-role.enum';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.Data].authorizationStatus;
export const getIsLoadingComplete = (state: State): boolean =>
  state[NameSpace.Data].isLoadingComplete;
export const getLoggedUserRole = (state: State): UserRole | null =>
  state[NameSpace.Data].loggedUserRole;
export const getRegistredUser = (state: State): UserFormRegister | null =>
  state[NameSpace.User].registringUser;
