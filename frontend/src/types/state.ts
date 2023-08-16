import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { User, UserFormRegister } from './user';
import { UserRole } from './user-role.enum';

export interface UserData {
  authorizationStatus: AuthorizationStatus;
  users: User[];
  loggedUserId: number | null;
  isLoadingComplete: boolean;
  isLogingComplete: boolean;
  hasError: boolean;
  loggedUserRole: UserRole | null;
  loggedUser: User | null;
  userAvatar: string;
}

export interface UserProcess {
  isEdit: boolean;
  registringUser: UserFormRegister | null;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
