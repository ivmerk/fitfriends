import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { User, UserFormRegister } from './user';

export interface UserData {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}

export interface UserProcess {
  registringUser: UserFormRegister | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
