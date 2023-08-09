import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { User, UserFormRegister } from './user';

export interface UserData {
  authorizationStatus: AuthorizationStatus;
  users: User[];
  loggedUser: User | null;
  isRegistringComplete: boolean;
  hasError: boolean;
}

export interface UserProcess {
  registringUser: UserFormRegister | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
