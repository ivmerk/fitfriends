import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserFormRegister } from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.Data].authorizationStatus;
export const getIsRegistrationComplete = (state: State): boolean =>
  state[NameSpace.Data].isRegistringComplete;
// export const getIsHasError = (state: State): boolean =>
//   state[NameSpace.Data].hasError;
// export const getLoggedUser = (state: State): User | null =>
//   state[NameSpace.Data].loggedUser;
export const getRegistredUser = (state: State): UserFormRegister | null =>
  state[NameSpace.User].registringUser;
