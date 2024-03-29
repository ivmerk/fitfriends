import { AuthorizationStatus } from '../common/const';
import { store } from '../store';
import { PersonalOrderTraining } from './personal-order-training';
import { Training } from './training';
import { TrainingOrderFeed } from './training-order-feed';
import { User, UserFormRegister } from './user';
import { UserFriendData } from './user-friend-data';
import { UserRole } from './user-role.enum';

export interface UserData {
  authorizationStatus: AuthorizationStatus;
  users: User[];
  loggedUserId: number | null;
  isLoadingComplete: boolean;
  isLogingComplete: boolean;
  isDeletingComplete: boolean;
  isAuthTokenValid: boolean,
  hasError: boolean;
  loggedUserRole: UserRole | null;
  loggedUser: User | null;
  userAvatar: string;
  userSertificate: string;
  userFriends: UserFriendData[];
  userMyFriendsCards: User[];
  personalTrainingOrders: PersonalOrderTraining[];
  userList: User[];
  user: User | null;
}

export interface UserProcess {
  isEdit: boolean;
  registringUser: UserFormRegister | null;
  listPageNumber: number;
  listLimit: number;
  listSortingAscType: boolean;
}

export interface TrainingData {
  trainerTrainingList: Training[];
  isLoadingComplete: boolean;
  trainerOrderedTrainingList: TrainingOrderFeed[];
  recomendatedTrainingList: Training[];
  traningListForCatalog: Training[];
}
export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
