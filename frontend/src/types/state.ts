import { AuthorizationStatus } from '../const';
import { store } from '../store';
import {
  User,
  UserFormRegister,
  UserFormRegisterDetailsClient,
  UserFormRegisterDetailsTrainer,
} from './user';

export interface UserData {
  authorizationStatus: AuthorizationStatus;
  users: User[];
  user: User | null;
}

export interface UserProcess {
  registringUser: UserFormRegister | null;
  registringUserDetailsClient: UserFormRegisterDetailsClient | null;
  registringUserDetailsTrainer: UserFormRegisterDetailsTrainer | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
