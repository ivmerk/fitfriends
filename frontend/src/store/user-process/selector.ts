import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserFormRegister } from '../../types/user';

export const getRegistredUser = (state: State): UserFormRegister | null =>
  state[NameSpace.User].registringUser;
export const getIsEdit = (state: State): boolean =>
  state[NameSpace.User].isEdit;
