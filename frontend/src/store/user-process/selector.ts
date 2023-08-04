import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserFormRegister } from '../../types/user';

export const getUserCommon = (state: State): UserFormRegister | null =>
  state[NameSpace.User].registringUser;
